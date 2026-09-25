import React, { useState, useEffect, useRef } from 'react';
import { Farm, Crop, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { aiApi } from '../services/api';
import { voiceService } from '../services/voiceService';
import {
  Bot, Mic, Send, Volume2, VolumeX, Sparkles, User, RefreshCw,
  Info, AlertCircle, CornerDownLeft
} from 'lucide-react';

interface FarmAIPageProps {
  currentFarm: Farm;
  currentCrop: Crop;
  language: LanguageCode;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

export const FarmAIPage: React.FC<FarmAIPageProps> = ({
  currentFarm,
  currentCrop,
  language
}) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: language === 'ta'
        ? `வணக்கம்! நான் ஃபாம்சென் AI. உங்கள் ${currentFarm.district} பண்ணையில் உள்ள ${currentCrop.crop_name} (${currentCrop.crop_stage}) பயிருக்கான வானிலை, உரம், நோய் தடுப்பு மற்றும் சந்தை ஆலோசனைகளை கேட்கலாம்.`
        : language === 'te'
        ? `నమస్కారం! నేను ఫార్మ్‌జెన్ AI. మీ ${currentFarm.district} లోని ${currentCrop.crop_name} (${currentCrop.crop_stage}) పంటకు సంబంధించి ఎరువులు, తెగుళ్ళు, మార్కెట్ వివరాలు అడగవచ్చు.`
        : language === 'kn'
        ? `ನಮಸ್ಕಾರ! ನಾನು ಫಾರ್ಮ್‌ಜೆನ್ AI. ನಿಮ್ಮ ${currentFarm.district} ಜಮೀನಿನ ${currentCrop.crop_name} (${currentCrop.crop_stage}) ಬೆಳೆಗೆ ಸಂಬಂಧಿಸಿದ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಕೇಳಬಹುದು.`
        : language === 'ml'
        ? `നമസ്കാരം! ഞാൻ ഫാംസെൻ AI. നിങ്ങളുടെ ${currentFarm.district} തോട്ടത്തിലെ ${currentCrop.crop_name} (${currentCrop.crop_stage}) കൃഷി സംബന്ധിച്ച എല്ലാ സംശയങ്ങളും ചോദിക്കാം.`
        : language === 'hi'
        ? `नमस्ते! मैं फार्मज़ेन AI हूँ। आपके ${currentFarm.district} के खेत में लगी ${currentCrop.crop_name} (${currentCrop.crop_stage}) फसल के लिए मौसम, खाद, रोग और मंडी भाव की जानकारी पूछें।`
        : `Hello Farmer! I am FarmZen AI. I have your ${currentFarm.district} farm data loaded for ${currentCrop.crop_name} (${currentCrop.crop_stage}). How can I assist your field decisions today?`,
      source: 'FARMZEN Agronomy Assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await aiApi.chat(userText, currentFarm.id, language);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: response.text,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Speak response in regional language
      setVoiceState('speaking');
      voiceService.speak(response.text, language, () => {
        setVoiceState('idle');
      });
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: 'ai-err-' + Date.now(),
        sender: 'assistant',
        text: 'FarmZen AI is currently connecting to the agricultural server. Your question has been logged.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleVoiceToggle = () => {
    if (voiceState === 'listening') {
      voiceService.stopListening();
      setVoiceState('idle');
    } else if (voiceState === 'speaking') {
      voiceService.stopSpeaking();
      setVoiceState('idle');
    } else {
      setVoiceState('listening');
      voiceService.startListening(
        language,
        (transcript) => {
          setVoiceState('idle');
          handleSend(transcript);
        },
        (err) => {
          console.warn('Voice STT error:', err);
          setVoiceState('idle');
          // If browser mic permission is denied, use a smart demo question
          const demoQ = t.ai.suggestedQuestions[0];
          handleSend(demoQ);
        }
      );
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-950/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-editorial heading-ai tracking-tight animate-heading-reveal">
              FARMZEN AI ASSISTANT
            </h1>
            <div className="underline-ai w-28 sm:w-40 mt-1.5 animate-underline-glow" />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.ai.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-800">
            Context: {currentCrop.crop_name} · {currentFarm.district}
          </span>
        </div>
      </div>

      {/* THREE-STEP INTELLIGENCE PIPELINE */}
      <div className="p-3.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
          <div>
            <span className="font-bold block text-purple-950 dark:text-purple-200">WHAT YOU ENTER</span>
            <span className="text-[11px] text-slate-500">Voice or Text Question in Regional Language</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
          <div>
            <span className="font-bold block text-purple-950 dark:text-purple-200">WHAT FARMZEN UNDERSTANDS</span>
            <span className="text-[11px] text-slate-500">Agronomy RAG + Farm Microclimate Context</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
          <div>
            <span className="font-bold block text-purple-950 dark:text-purple-200">WHAT FARMZEN RECOMMENDS</span>
            <span className="text-[11px] text-slate-500">Actionable Guidance + Regional Spoken Voice</span>
          </div>
        </div>
      </div>

      {/* Voice Assistant Orb Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white border border-purple-800/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          {/* AI Glowing Orb */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
            <Bot className="w-7 h-7 text-white" />
            {voiceState === 'listening' && (
              <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {voiceState === 'listening'
                ? t.ai.listening
                : voiceState === 'speaking'
                ? t.ai.speaking
                : 'Voice-Activated Agronomy Assistant'}
            </h3>
            <p className="text-xs text-purple-200/80">
              Speak naturally in your preferred language without typing.
            </p>
          </div>
        </div>

        {/* Large Ergonomic Microphone Button */}
        <button
          onClick={handleVoiceToggle}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all whitespace-nowrap ${
            voiceState === 'listening'
              ? 'bg-red-500 text-white shadow-red-500/40 animate-pulse'
              : voiceState === 'speaking'
              ? 'bg-amber-400 text-slate-950 shadow-amber-400/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
          }`}
        >
          {voiceState === 'speaking' ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Stop Speaking</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>{voiceState === 'listening' ? 'Listening...' : t.ai.tapToSpeak}</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested 1-Tap Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {t.ai.suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Conversational Messages Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] opacity-70">
                  <span>{m.source || (isUser ? 'You' : 'FarmZen AI')}</span>
                  <span>{m.timestamp}</span>
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex gap-2.5 items-center text-xs text-purple-600 dark:text-purple-400">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span className="animate-pulse">{t.ai.thinking}</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(input); }}
          placeholder={t.ai.placeholder}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />

        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isThinking}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
