# 🌟 Neon Tales - AI-Powered Interactive Storytelling for Children

<div align="center">

![Neon Tales](https://img.shields.io/badge/Neon%20Tales-v1.0.0-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**AI-driven storytelling platform for children featuring bilingual support, gamification, and native TTS**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Android Setup](#-android-integration) • [Best Practices](#-best-practices-for-miniapps-in-webview)

</div>

---

## 📖 Overview

Neon Tales is an innovative storytelling application that uses AI to generate engaging, educational, and fun stories for children aged 3-12. With a futuristic neon web3 theme, bilingual support, and gamification features, it makes reading exciting and interactive.

### 🎯 Key Highlights

- 🤖 **AI-Powered**: Generate unlimited unique stories using Perplexity AI
- 🌍 **Bilingual**: Full support for Indonesian 🇮🇩 and English 🇬🇧
- 🏆 **Gamification**: 25+ achievement badges and reading streak tracking
- 🎭 **Character Creator**: Kids can create and customize their own story characters
- 🎙️ **Native TTS**: High-quality text-to-speech with Android native integration
- 📚 **Persistent Library**: Stories never lost with IndexedDB storage
- 👶 **Age-Appropriate**: Content filters for 3-5, 6-8, and 9-12 year olds
- 📱 **Mobile-First**: Optimized for mobile devices and Android WebView

---

## ✨ Features

### 🎨 Story Generation
- **9 Story Categories**: Folklore, Myth, Legend, Fable, Fairy Tale, Adventure, Parable, Mystery, Science
- **Age Filters**: Content appropriate for different age groups (3-5, 6-8, 9-12 years)
- **Bilingual Support**: Generate stories in Indonesian or English
- **Story Continuation**: Continue existing stories with AI
- **Character Integration**: Use custom characters in generated stories

### 🏆 Gamification & Engagement
- **25+ Achievement Badges**:
  - 📖 Reading Milestones (First Story, Story Explorer, Story Master, Story Legend)
  - 🔥 Reading Streaks (3-day, 7-day, 30-day streaks)
  - 🌍 Bilingual Achievements
  - 📚 Category-Specific Badges (Folklore Lover, Myth Explorer, etc.)
  - ⭐ Hidden Special Achievements
- **Reading Streak Tracker**: Motivate daily reading habits
- **User Statistics**: Track total stories, favorites, and progress
- **Star Rating System**: Rate stories to help improve content

### 🎭 Character Creator
- Create custom story characters with:
  - Name and description
  - 8 personality types (Kind, Brave, Smart, Funny, Curious, Shy, Creative, Adventurous)
  - Physical appearance details
  - Save and reuse in multiple stories

### 🎙️ Text-to-Speech (TTS)
- **Native Android TTS Integration**: High-quality voice synthesis
- **Web Speech API Fallback**: Works in browsers for testing
- **Language Support**: Indonesian and English voices
- **Speed Presets**: Slow 🐢, Normal 🚶, Fast 🏃, Turbo 🚀
- **Advanced Controls**: Rate, pitch, and volume adjustment
- **No Permissions Required**: TTS works without microphone access

### 📚 Story Library
- **Persistent Storage**: Uses IndexedDB for permanent storage
- **Never Lose Stories**: Survives cache clears
- **Search & Filter**: Find stories by category, age, language
- **Bookmark System**: Mark favorite stories
- **Export & Share**: Copy or share stories via social media

### 📤 Social Sharing
- Share to WhatsApp 💬
- Share to Telegram ✈️
- Share to Twitter/X 🐦
- Share to Facebook 👥
- Copy to clipboard (fallback for WebView restrictions)

### 📖 Reading Experience
- **Progress Bar**: Track reading position
- **Font Size Control**: Adjust text size for comfort
- **Responsive Design**: Works on all screen sizes
- **Mobile-Optimized**: Safe area padding for notches
- **Three.js Background**: Animated neon visual effects

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/) patterns
- **3D Graphics**: [Three.js](https://threejs.org/) for neon background effects
- **Icons**: [Lucide React](https://lucide.dev/)

### AI & APIs
- **Story Generation**: [Perplexity AI](https://www.perplexity.ai/)
- **API Proxy**: Next.js API routes for secure external calls

### Storage & State
- **Persistent Storage**: IndexedDB (via custom storage manager)
- **Fallback Storage**: localStorage
- **State Management**: React hooks (useState, useEffect, useCallback)

### Mobile Integration
- **Android**: Native TTS via JavaScript Bridge
- **WebView**: Optimized for Android WebView and iOS WKWebView
- **Platform Detection**: Automatic detection of native features

### Development Tools
- **Package Manager**: npm
- **Code Quality**: TypeScript strict mode
- **Build Tool**: Next.js built-in compiler

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Android Studio (for Android app integration)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/neon-tales.git
cd neon-tales
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file (or hardcode in API routes):
```env
PERPLEXITY_API_KEY=your_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📱 Android Integration

### Native TTS Setup

For optimal TTS performance in Android WebView, implement the native bridge:

#### 1. Create TTSBridge.kt

File: `app/src/main/java/com/yourpackage/neontales/TTSBridge.kt`

```kotlin
package com.yourpackage.neontales

import android.content.Context
import android.speech.tts.TextToSpeech
import android.util.Log
import android.webkit.JavascriptInterface
import java.util.*

class TTSBridge(private val context: Context) {
    private var tts: TextToSpeech? = null
    private var isInitialized = false
    
    companion object {
        private const val TAG = "TTSBridge"
    }
    
    init {
        tts = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                isInitialized = true
                Log.d(TAG, "✅ TTS initialized successfully")
                
                val result = tts?.setLanguage(Locale("id", "ID"))
                if (result == TextToSpeech.LANG_MISSING_DATA || 
                    result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    Log.w(TAG, "⚠️ Indonesian not supported, using English")
                    tts?.setLanguage(Locale.US)
                }
            } else {
                Log.e(TAG, "❌ TTS initialization failed")
            }
        }
    }
    
    @JavascriptInterface
    fun speak(text: String, lang: String = "id") {
        if (!isInitialized) {
            Log.w(TAG, "⚠️ TTS not initialized yet")
            return
        }
        
        val locale = when (lang) {
            "en" -> Locale.US
            "id" -> Locale("id", "ID")
            else -> Locale("id", "ID")
        }
        
        tts?.language = locale
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
        
        Log.d(TAG, "🎙️ Speaking: ${text.take(50)}... (lang: $lang)")
    }
    
    @JavascriptInterface
    fun stop() {
        tts?.stop()
        Log.d(TAG, "⏹️ TTS stopped")
    }
    
    @JavascriptInterface
    fun isAvailable(): Boolean {
        return isInitialized
    }
    
    @JavascriptInterface
    fun setRate(rate: Float) {
        tts?.setSpeechRate(rate)
        Log.d(TAG, "⚡ Speech rate: $rate")
    }
    
    @JavascriptInterface
    fun setPitch(pitch: Float) {
        tts?.setPitch(pitch)
        Log.d(TAG, "🎵 Speech pitch: $pitch")
    }
    
    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        Log.d(TAG, "🛑 TTS shutdown")
    }
}
```

#### 2. Update MainActivity.kt

```kotlin
package com.yourpackage.neontales

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView
    private lateinit var ttsBridge: TTSBridge

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize TTS Bridge
        ttsBridge = TTSBridge(this)

        webView = WebView(this)
        setContentView(webView)

        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.loadsImagesAutomatically = true
        settings.allowContentAccess = true
        settings.allowFileAccess = true
        settings.javaScriptCanOpenWindowsAutomatically = true
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        // Inject TTS Bridge
        webView.addJavascriptInterface(ttsBridge, "AndroidTTS")
        Log.d("WEBVIEW", "✅ AndroidTTS bridge injected")

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                Log.d("WEBVIEW", "✅ Page loaded: $url")
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                Log.e("WEBVIEW", "❌ Error: ${error?.description}")
            }
        }

        webView.loadUrl("https://your-deployed-url.vercel.app")
    }
    
    override fun onDestroy() {
        super.onDestroy()
        ttsBridge.shutdown()
        Log.d("WEBVIEW", "🛑 TTS Bridge shutdown")
    }
}
```

#### 3. AndroidManifest.xml

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.yourpackage.neontales">

    <!-- ✅ Only INTERNET permission needed for TTS -->
    <uses-permission android:name="android.permission.INTERNET" />
    
    <!-- ❌ NO RECORD_AUDIO needed for TTS! -->

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.NeonTales">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### 4. Testing Native TTS

1. Build and install APK on device
2. Open app and generate a story
3. Click TTS button
4. Look for **green "Native" badge** in UI (indicates native TTS detected)
5. Check Logcat for:
   - `✅ AndroidTTS bridge injected`
   - `✅ TTS initialized successfully`
   - `🎙️ Speaking: ...`

---

## 📚 Project Structure

```
neon-tales/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── proxy/          # API proxy for external calls
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main app page
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   ├── AchievementBadges.tsx
│   │   ├── CharacterCreator.tsx
│   │   ├── NeonBackground.tsx
│   │   ├── StoryDisplay.tsx
│   │   ├── StoryGenerator.tsx
│   │   └── TextToSpeech.tsx
│   ├── hooks/
│   │   ├── useTextToSpeech.ts  # TTS hook with native bridge
│   │   └── useAchievements.ts  # Achievement tracking
│   ├── lib/
│   │   ├── storage.ts          # IndexedDB storage manager
│   │   ├── achievements.ts     # Achievement definitions
│   │   └── utils.ts            # Utility functions
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── ANDROID_TTS_SETUP.md       # Detailed Android setup guide
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 🎯 Best Practices for MiniApps in WebView

This project demonstrates production-ready patterns for building web apps that run in mobile WebViews:

### ✅ API Restrictions & Workarounds

**Don't Use (Blocked in WebView):**
- ❌ `navigator.share()` - Web Share API
- ❌ `navigator.clipboard.writeText()` - Clipboard API  
- ❌ `speechSynthesis` (unreliable in WebView)
- ❌ `requestPointerLock()`

**Use Instead:**
- ✅ Social media share URLs (`https://wa.me/?text=...`)
- ✅ `document.execCommand('copy')` for clipboard
- ✅ Native Android TTS via JavaScript Bridge
- ✅ Direct URL schemes for external apps

### ✅ Native Bridge Integration

**Pattern for Feature Detection:**
```typescript
// 1. Detect native bridge
const hasNativeBridge = typeof window.AndroidTTS !== 'undefined';

// 2. Use native if available
if (hasNativeBridge) {
  window.AndroidTTS.speak(text, language);
}
// 3. Fallback to web API
else if ('speechSynthesis' in window) {
  speechSynthesis.speak(utterance);
}
// 4. Show helpful error
else {
  showError('Feature not supported');
}
```

### ✅ Persistent Storage

**Use IndexedDB for Production:**
```typescript
// Better than localStorage for:
// - Larger storage capacity
// - Structured data
// - Better performance
// - Survives cache clears (in most cases)

// Always provide localStorage fallback
```

### ✅ Mobile-First Design

- Touch-friendly button sizes (min 44x44px)
- Safe area padding for notches (`pt-12` on mobile)
- Responsive layouts with Tailwind breakpoints
- Smooth scrolling and animations
- Fast loading with optimized assets

### ✅ Permission Management

**Only Request What You Need:**
- ✅ `INTERNET` - Always needed for web apps
- ❌ `RECORD_AUDIO` - NOT needed for TTS!
- Add others only when actually required

### ✅ Error Handling

- Graceful degradation for unsupported features
- Clear user guidance when features blocked
- Fallback mechanisms for all critical features
- User-friendly error messages (avoid technical jargon)

---

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### WebView Testing
- [ ] Android WebView (different versions)
- [ ] iOS WKWebView
- [ ] Feature detection working correctly
- [ ] Native bridges properly detected

### Feature Testing
- [ ] Story generation (all categories)
- [ ] Bilingual support (ID/EN)
- [ ] Age filters working
- [ ] TTS with native Android bridge
- [ ] Achievement unlocking
- [ ] Reading streak tracking
- [ ] Character creator CRUD
- [ ] Story library persistence
- [ ] Social sharing (all platforms)
- [ ] Copy to clipboard
- [ ] Responsive design (all breakpoints)

### Performance Testing
- [ ] Fast initial load
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] IndexedDB operations performant
- [ ] Works on low-end devices

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow TypeScript strict mode guidelines
4. Write clean, documented code
5. Test thoroughly (browser + WebView)
6. Commit with clear messages (`git commit -m 'Add AmazingFeature'`)
7. Push to branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

### Code Style

- Use TypeScript strict mode (no implicit `any`)
- Follow existing component patterns
- Use Tailwind CSS for styling
- Write descriptive variable names
- Add comments for complex logic
- Keep files small and modular

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Perplexity AI** - For powerful story generation capabilities
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For utility-first styling
- **Three.js** - For stunning 3D graphics
- **shadcn/ui** - For beautiful UI component patterns
- **Open Source Community** - For invaluable tools and libraries

---

## 📧 Contact & Support

- **Website**: [neontales.elpeef.com](https://neontales.elpeef.com)
- **Issues**: [GitHub Issues](https://github.com/mrbrightsides/neon-tales/issues)
- **Email**: khudri@binadarma.ac.id/support@elpeef.com

---

## 🗺️ Roadmap

### Future Features (Potential)
- [ ] Word highlighting during TTS
- [ ] Interactive story choices (Choose Your Own Adventure)
- [ ] Story illustrations with AI image generation
- [ ] Parental dashboard with analytics
- [ ] Reading comprehension quizzes
- [ ] Offline mode with cached stories
- [ ] Dark mode / Night reading mode
- [ ] Web3 integration (NFT story minting on Base)
- [ ] Collaborative storytelling mode
- [ ] Community story sharing

---

<div align="center">

**Made with ❤️ for children and families**

If you find this project helpful, please consider giving it a ⭐!

[Report Bug](https://github.com/yourusername/neon-tales/issues) · [Request Feature](https://github.com/yourusername/neon-tales/issues)

</div>
