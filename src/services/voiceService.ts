import { LanguageCode } from '../types';

const langMap: Record<LanguageCode, string> = {
  en: 'en-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  hi: 'hi-IN'
};

export class VoiceService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      }
    }
  }

  startListening(
    language: LanguageCode,
    onResult: (transcript: string) => void,
    onError: (err: any) => void
  ) {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported in this browser environment'));
      return;
    }

    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    this.recognition.lang = langMap[language] || 'en-IN';
    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      onError(e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text: string, language: LanguageCode, onEnd?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text of markdown stars and hashes
    const cleanText = text.replace(/[*_#`]/g, '').slice(0, 300);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for agricultural clarity

    // Try to find regional voice if installed
    const voices = window.speechSynthesis.getVoices();
    const targetLang = langMap[language] || 'en-IN';
    const matchedVoice = voices.find(v => v.lang.includes(targetLang) || v.lang.startsWith(language));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
