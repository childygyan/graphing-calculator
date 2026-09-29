/**
 * English scientific dictionary — the `/scientific-calculator/` page prose
 * plus the ScientificCalculator island strings (currently unwired; see
 * docs/I18N-CONTRACTS.md).
 *
 * Keypad `label`s are what the user sees on the keys; `ariaLabel`s are the
 * accessible names. The `insert` text each key types is expression syntax
 * and is deliberately NOT translated — it lives with the component.
 */

import type { ScientificStrings } from '../types.js';

export const scientific: ScientificStrings = {
  seo: {
    title: 'Scientific Calculator Online — Free with DEG/RAD Modes | Graphing Calculator',
    description:
      'Free online scientific calculator: trig, inverse trig, log, ln, powers, roots, π and e ' +
      'with DEG/RAD modes, keyboard support, and clear error messages.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Scientific Calculator', href: '/scientific-calculator/' },
  ],
  heading: 'Scientific Calculator',
  intro: [
    'A free online scientific calculator for everyday math: arithmetic with correct order of ' +
      'operations, trigonometric and inverse trigonometric functions, base-10 and natural ' +
      'logarithms, powers, roots, and the constants π and e. Type on your keyboard or tap the ' +
      'keypad — every calculation runs in your browser through the same expression engine as ' +
      'our graphing calculator.',
  ],
  sections: [
    {
      heading: 'What this calculator does',
      body: [
        'Enter any expression — for example sin(30) + √(16), log(1000), or 2^10 — and press = to evaluate it. The calculator follows standard precedence (parentheses, then powers, then multiplication and division, then addition and subtraction), so 2 + 3 × 4 gives 14, not 20.',
        'Beyond arithmetic you get the full scientific set: sin, cos, tan and their inverses asin, acos, atan; log (base 10) and ln (natural logarithm); xʸ powers including fractional exponents; square roots; and the constants π and e. Expressions can be nested freely, e.g. sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Degrees vs radians (DEG and RAD modes)',
      body: [
        'Angles can be measured in degrees or radians, and trigonometric functions give different answers depending on which you mean: sin(30°) = 0.5, but sin(30 radians) ≈ −0.988. The DEG/RAD toggle at the top-left of the keypad switches between the two, and the badge above the display always shows the active mode.',
        'In DEG mode, sin, cos and tan read their input as degrees, while asin, acos and atan report their results in degrees — matching the behavior of a physical scientific calculator. In RAD mode everything works in radians, which is what most formulas in calculus and physics expect. If a trig result looks wrong, the angle mode is the first thing to check.',
      ],
    },
    {
      heading: 'Keyboard shortcuts',
      body: [
        'You never have to touch the keypad: click the expression field and type. Digits, +, −, (, ), ^ and . work as typed; typing * inserts × and / inserts ÷; Enter or = evaluates; Escape clears everything; Backspace deletes as usual. After a result, typing a digit starts a fresh expression, while typing an operator continues from the previous answer.',
      ],
    },
    {
      heading: 'Honest errors, not NaN',
      body: [
        'When an expression has no meaningful answer, this calculator says so in plain language instead of showing NaN or Infinity. Dividing by zero, taking the square root of a negative number, or the logarithm of a non-positive number each produce a specific explanation. Incomplete expressions get guidance too: a trailing operator or mismatched parentheses tells you exactly what to fix.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Should I use DEG or RAD mode?',
      answer:
        'Use DEG for everyday angle problems (a 30° incline, a triangle with degree angles) ' +
        'and RAD for calculus, physics formulas, and anything involving π as an angle. The mode ' +
        'only affects sin, cos, tan, asin, acos and atan — everything else is identical.',
    },
    {
      question: 'What is the difference between log and ln?',
      answer:
        'The log key computes the base-10 logarithm (log 1000 = 3) and ln computes the ' +
        'natural logarithm, base e (ln(e) = 1). Both are undefined for zero and negative ' +
        'numbers, and the calculator will tell you so.',
    },
    {
      question: 'Why does 1 ÷ 0 show an error instead of infinity?',
      answer:
        'Division by zero is undefined in mathematics — it has no single meaningful value. ' +
        'Showing "infinity" would be misleading (1 ÷ 0 and −1 ÷ 0 cannot both be infinity), so ' +
        'the calculator reports it honestly as undefined.',
    },
    {
      question: 'Can I type expressions with my keyboard?',
      answer:
        'Yes. Focus the expression field and type normally; Enter evaluates and Escape ' +
        'clears. The * key inserts ×, / inserts ÷, and ^ is the power operator, so 2^10 gives ' +
        '1024.',
    },
    {
      question: 'How precise are the results?',
      answer:
        'Results are shown with 10 significant digits, computed in double-precision floating ' +
        'point — the same arithmetic a physical scientific calculator uses. Very large results ' +
        'that overflow are reported as overflow rather than infinity.',
    },
    {
      question: 'Can I graph an expression instead of just evaluating it?',
      answer:
        'Yes — the graphing calculator on this site plots functions of x with zoom, trace, ' +
        'roots, and tangent-line analysis. It uses the same expression engine, so anything you ' +
        'evaluate here behaves identically there.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Scientific Calculator',
    angleModeTemplate: 'Angle mode: {mode}',
    degrees: 'degrees',
    radians: 'radians',
    expressionLabel: 'Expression',
    expressionPlaceholder: 'e.g. sin(30) + √(16)',
    idleHint: 'Press = or Enter to evaluate',
    keypadLabel: 'Calculator keypad',
    tip: 'Tip: type on your keyboard — Enter evaluates, Esc clears, × ÷ and ^ work as usual.',
    loadFailedTitle: 'Scientific calculator failed to load',
    keys: [
      { label: 'DEG', ariaLabel: 'Angle mode' },
      { label: 'sin', ariaLabel: 'sine' },
      { label: 'cos', ariaLabel: 'cosine' },
      { label: 'tan', ariaLabel: 'tangent' },
      { label: 'AC', ariaLabel: 'clear' },
      { label: 'asin', ariaLabel: 'arcsine' },
      { label: 'acos', ariaLabel: 'arccosine' },
      { label: 'atan', ariaLabel: 'arctangent' },
      { label: '(', ariaLabel: 'left parenthesis' },
      { label: ')', ariaLabel: 'right parenthesis' },
      { label: 'log', ariaLabel: 'logarithm base 10' },
      { label: 'ln', ariaLabel: 'natural logarithm' },
      { label: '√', ariaLabel: 'square root' },
      { label: 'π', ariaLabel: 'pi' },
      { label: 'e', ariaLabel: "Euler's number e" },
      { label: '7', ariaLabel: '7' },
      { label: '8', ariaLabel: '8' },
      { label: '9', ariaLabel: '9' },
      { label: '÷', ariaLabel: 'divide' },
      { label: '⌫', ariaLabel: 'backspace' },
      { label: '4', ariaLabel: '4' },
      { label: '5', ariaLabel: '5' },
      { label: '6', ariaLabel: '6' },
      { label: '×', ariaLabel: 'multiply' },
      { label: 'xʸ', ariaLabel: 'power' },
      { label: '1', ariaLabel: '1' },
      { label: '2', ariaLabel: '2' },
      { label: '3', ariaLabel: '3' },
      { label: '−', ariaLabel: 'minus' },
      { label: '+', ariaLabel: 'plus' },
      { label: '0', ariaLabel: '0' },
      { label: '.', ariaLabel: 'decimal point' },
      { label: '=', ariaLabel: 'equals' },
    ],
    errors: {
      divisionByZero: 'Undefined — division by zero.',
      sqrtNegative: 'Undefined — the square root of a negative number is not a real number.',
      logNonPositive: 'Undefined — the logarithm of a non-positive number is not a real number.',
      asinAcosDomain: 'Undefined — asin and acos need an argument between −1 and 1.',
      tanUndefined: 'Undefined — tan is not defined at odd multiples of 90°.',
      emptyExpression: 'Enter an expression first.',
      trailingOperator: 'The expression ends with an operator — add a number after it.',
      mismatchedParens: 'Mismatched parentheses — every “(” needs a matching “)”.',
      badCharTemplate: "I don't understand the character “{char}” — remove it and try again.",
      unreadable: 'The expression could not be read — check for typos.',
      notReal: 'Undefined — the result is not a real number.',
      overflow: 'Overflow — the result is too large to display.',
    },
  },
};
