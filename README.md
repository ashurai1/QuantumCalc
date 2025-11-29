# QuantumCalc - Scientific Calculator

<div align="center">

![QuantumCalc Banner](https://img.shields.io/badge/QuantumCalc-Scientific_Calculator-ff6b6b?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A premium, production-quality scientific calculator with stunning glassmorphism design, dark/light themes, and interactive sound effects.**

[Live Demo](#https://quantum-calc-pi.vercel.app/) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

---

## ✨ Features

### 🧮 **Complete Calculator Functionality**
- **Basic Operations**: Addition, Subtraction, Multiplication, Division
- **Scientific Functions**: sin, cos, tan, log, ln, √ (square root)
- **Mathematical Constants**: π (pi), e (Euler's number)
- **Power Functions**: x², x³, x^y (custom exponent)
- **Special Operations**: n! (factorial), % (percentage), +/− (sign toggle)
- **Bracket Support**: Full parentheses support with proper precedence
- **Memory Operations**: MC (clear), MR (recall), M+ (add), M− (subtract)

### 🎨 **Premium UI/UX Design**
- **Glassmorphism Design**: Frosted glass effect with backdrop blur
- **Dual Themes**: 
  - 🌙 **Dark Mode**: Deep navy gradient with purple accents
  - ☀️ **Light Mode**: Warm peach/coral gradient with vibrant colors
- **3D Realistic Buttons**: Multi-layer shadows with depth effects
- **Smooth Animations**: Hover effects, ripple animations, theme transitions
- **Responsive Layout**: Optimized for mobile, tablet, and desktop

### 🔊 **Interactive Sound Effects**
- Click sound on every button press
- Web Audio API integration (no external files)
- Toggle sound on/off with 🔊/🔇 button
- Sound preference persists across sessions

### 📜 **Advanced Features**
- **History Panel**: Slide-in panel showing up to 50 calculations
- **Click to Reuse**: Tap any history item to reuse the calculation
- **Copy to Clipboard**: One-click result copying with visual feedback
- **Keyboard Support**: Full keyboard input with visual button feedback
- **Mode Toggle**: Switch between Basic and Scientific calculator modes
- **Safe Evaluation**: Custom expression parser (no eval() - secure!)
- **Error Handling**: Graceful handling of division by zero, invalid inputs

### 💾 **Persistent Settings**
All your preferences are automatically saved:
- Theme selection (dark/light)
- Sound on/off state
- Calculator mode (basic/scientific)
- Calculation history

---

## 🚀 Installation

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashurai1/QuantumCalc.git
   cd QuantumCalc
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

That's it! No build process, no dependencies, no installation required. 🎉

### File Structure
```
QuantumCalc/
├── index.html      # Main HTML structure
├── style.css       # Glassmorphism design & themes
├── script.js       # Calculator logic & features
└── README.md       # This file
```

---

## 💻 Usage

### Basic Calculator Mode
By default, the calculator opens in **Basic Mode** showing:
- Number pad (0-9)
- Basic operators (+, −, ×, ÷)
- Brackets, percentage, sign toggle
- Clear and backspace buttons

### Scientific Calculator Mode
Click the **🔬 Scientific** button to reveal:
- Memory functions (MC, MR, M+, M−)
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Square root (√)
- Constants (π, e)
- Power functions (x², x³, x^y)
- Factorial (n!)

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `.` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `(` `)` | Brackets |
| `Enter` | Calculate (equals) |
| `Backspace` | Delete last character |
| `Escape` | Clear all |

### Theme & Sound Controls
- **Theme Toggle** (☀️/🌙): Switch between light and dark modes
- **Sound Toggle** (🔊/🔇): Enable/disable button click sounds
- **History Button** (📜): Open calculation history panel

---

## 🎯 Technical Highlights

### Safe Expression Evaluation
QuantumCalc uses a custom **Shunting-yard algorithm** for expression parsing instead of `eval()`, making it:
- ✅ **Secure**: No code injection vulnerabilities
- ✅ **Accurate**: Proper operator precedence
- ✅ **Reliable**: Handles complex expressions correctly

### Web Audio API
Sound effects are generated programmatically using the Web Audio API:
- No external audio files needed
- Lightweight and fast
- Customizable frequency and duration

### CSS Architecture
- **CSS Custom Properties**: Easy theme switching
- **Glassmorphism**: `backdrop-filter` for frosted glass effect
- **3D Effects**: Multi-layer shadows (outer + inset)
- **Smooth Transitions**: All animations use `cubic-bezier` easing

### JavaScript Features
- **Modular Code**: Clean separation of concerns
- **State Management**: Single calculator state object
- **LocalStorage**: Persistent user preferences
- **Error Handling**: Try-catch blocks for all operations

---

## 🌟 Screenshots

### Dark Mode
![Dark Mode Calculator](https://via.placeholder.com/600x400/1a1a2e/8b5cf6?text=Dark+Mode+Calculator)

### Light Mode
![Light Mode Calculator](https://via.placeholder.com/600x400/ffecd2/ff6b6b?text=Light+Mode+Calculator)

### Scientific Mode Expanded
![Scientific Functions](https://via.placeholder.com/600x400/1a1a2e/8b5cf6?text=Scientific+Mode)

### History Panel
![History Panel](https://via.placeholder.com/600x400/1a1a2e/8b5cf6?text=History+Panel)

---

## 🛠️ Browser Compatibility

QuantumCalc works on all modern browsers:

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full |
| Firefox | 85+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 88+ | ✅ Full |
| Opera | 74+ | ✅ Full |

**Note**: Requires support for CSS `backdrop-filter` and Web Audio API.

---

## 📱 Responsive Design

QuantumCalc is fully responsive with breakpoints at:
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

All features work seamlessly across devices!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add more scientific functions (sinh, cosh, tanh, etc.)
- Implement calculation export (PDF, CSV)
- Add unit conversion features
- Create additional themes
- Improve accessibility (ARIA labels, screen reader support)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ashwani Rai**

- GitHub: [@ashurai1](https://github.com/ashurai1)
- Email: raishwani151104@gmail.com

---

## 🙏 Acknowledgments

- Inspired by modern calculator designs
- Built with pure HTML, CSS, and JavaScript
- No frameworks or libraries required
- Glassmorphism design trend

---

## 📊 Project Stats

![Code Size](https://img.shields.io/github/languages/code-size/ashurai1/QuantumCalc?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/ashurai1/QuantumCalc?style=flat-square)
![Stars](https://img.shields.io/github/stars/ashurai1/QuantumCalc?style=flat-square)
![Forks](https://img.shields.io/github/forks/ashurai1/QuantumCalc?style=flat-square)

---

<div align="center">

**Made with ❤️ by Ashwani Rai**

© 2025 Ashwani Rai. All rights reserved.

⭐ Star this repo if you found it helpful!

</div>
