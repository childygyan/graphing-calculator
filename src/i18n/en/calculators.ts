/**
 * English calculators dictionary — the `/calculators/` hub plus the
 * derivative, integral, and root-finder tool pages, and the MathTools
 * island strings (currently unwired; see docs/I18N-CONTRACTS.md).
 */

import type { CalculatorsStrings } from '../types.js';

export const calculators: CalculatorsStrings = {
  index: {
    seo: {
      title:
        'Calculators — Graphing, Scientific, 3D, Derivative, Integral & Root Tools | Graphing Calculator',
      description:
        'Browse the working calculator collection: the graphing calculator, scientific ' +
        'calculator, 3D surface graphing, plus focused derivative, integral, and root-finding ' +
        'tools. Free, no sign-up.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators/' },
    ],
    heading: 'Calculators',
    intro:
      'A small collection of focused math tools. Each one is listed here only when it ' +
      'genuinely works — nothing is a placeholder entry.',
    tools: [
      {
        title: 'Graphing Calculator',
        description: 'The main workspace',
        blurb:
          'Plot Cartesian, parametric, and polar expressions with an interactive canvas ' +
          'graph, analyze roots, derivatives and integrals, animate variables with sliders, ' +
          'and ask the AI assistant.',
        href: '/graphing-calculator/',
        cta: 'Open the graphing calculator',
      },
      {
        title: 'Derivative Calculator',
        description: 'f′(a) numerically',
        blurb:
          'Enter any function f(x) and a point a to estimate the derivative f′(a) with the ' +
          'central difference method — the same routine behind the graph tangent lines.',
        href: '/calculators/derivative/',
        cta: 'Differentiate a function',
      },
      {
        title: 'Integral Calculator',
        description: 'Definite integrals',
        blurb:
          'Compute ∫[a,b] f(x) dx numerically with adaptive Simpson’s rule, with an ' +
          'explanation of signed area and when integrals vanish.',
        href: '/calculators/integral/',
        cta: 'Integrate a function',
      },
      {
        title: 'Root Finder',
        description: 'Solve f(x) = 0',
        blurb:
          'Find every real root of f(x) on an interval you choose, using sign-change ' +
          'scanning refined by Brent’s method — verified, never guessed.',
        href: '/calculators/root-finder/',
        cta: 'Find roots',
      },
      {
        title: 'Scientific Calculator',
        description: 'Trig, logs, powers & more',
        blurb:
          'A full keypad calculator: trigonometric and inverse functions with DEG/RAD ' +
          'modes, logarithms, powers, roots, and constants — with honest error messages ' +
          'instead of silent NaN.',
        href: '/scientific-calculator/',
        cta: 'Calculate',
      },
      {
        title: '3D Graph',
        description: 'Surfaces z = f(x, y)',
        blurb:
          'Plot 3D surfaces like x²+y² or sin(√(x²+y²)). Drag to rotate, scroll to zoom, ' +
          'and adjust the mesh detail — rendered live on canvas with honest gaps where the ' +
          'function is undefined.',
        href: '/3d/',
        cta: 'Explore 3D surfaces',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Derivative Calculator — Compute f′(x) Instantly | Graphing Calculator',
      description:
        'Free online derivative calculator: enter any function f(x) and a point to get ' +
        'f′(a) numerically, with an explanation of what the derivative means.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators/' },
      { label: 'Derivative Calculator', href: '/calculators/derivative/' },
    ],
    heading: 'Derivative Calculator',
    intro: [
      'The derivative of a function at a point measures its instantaneous rate of change — ' +
        'geometrically, the slope of the tangent line to the graph at that point. Enter any ' +
        'function below and this tool estimates f′(a) numerically.',
    ],
    sections: [
      {
        heading: 'How the calculation works',
        body: [
          'This tool uses the central difference formula: f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'with a small step h. It is the same numerical method the graphing calculator uses ' +
            'for its tangent-line analysis, so results here match what you see when you inspect ' +
            'a tangent on the graph.',
          'Numerical differentiation is an approximation. For smooth functions like ' +
            'polynomials, trigonometric functions, and exponentials, the estimate is accurate ' +
            'to many decimal places. At sharp corners (such as |x| at x = 0) or discontinuities, ' +
            'the derivative may not exist, and the tool will tell you so honestly instead of ' +
            'returning a misleading number.',
        ],
      },
      {
        heading: 'What the derivative tells you',
        body: [
          'A positive derivative means the function is increasing at that point; a negative ' +
            'derivative means it is decreasing. The larger the magnitude, the steeper the graph. ' +
            'Where the derivative is zero, the graph momentarily flattens — these are the ' +
            'candidate locations for local maxima and minima.',
          'Derivatives also carry physical meaning: if f(x) is position over time, f′(x) is ' +
            'velocity; if f(x) is velocity, f′(x) is acceleration. Try f(x) = x² at a = 2 ' +
            '(result: 4) and at a = −2 (result: −4) to see the sign change across the minimum.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this an exact symbolic derivative?',
        answer:
          'No — this tool computes a numerical approximation using the central difference ' +
          'method. It is highly accurate for smooth functions but remains an estimate, shown ' +
          'rounded to 6 decimal places.',
      },
      {
        question: 'Why does it fail at some points?',
        answer:
          'Some functions are not differentiable everywhere: |x| has a corner at x = 0, and ' +
          'functions with jumps or vertical asymptotes have no meaningful slope there. The ' +
          'tool reports that it cannot estimate the derivative rather than guessing.',
      },
      {
        question: 'How is this related to the tangent line feature?',
        answer:
          'The tangent line to f at x = a has slope f′(a) — exactly what this tool computes. ' +
          'In the graphing calculator you can draw the tangent line on the graph and read ' +
          'off the same slope visually.',
      },
    ],
    related: [
      '/calculators/integral/',
      '/calculators/root-finder/',
      '/learn/understanding-derivatives/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Derivative calculator',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'e.g. x^2',
      atLabel: 'at a =',
      atPlaceholder: 'e.g. 2',
      calculate: 'Calculate f′(a)',
      fillError: 'Enter a function and a point.',
      parseError: 'Could not parse f(x). Check the expression.',
      badPoint: 'The point a must be a number.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'Could not estimate the derivative here — the function may be undefined or not ' +
        'smooth at this point.',
      loadFailedTitle: 'Derivative tool failed to load',
      panelTitle: 'Differentiate',
      functionNameLabel: 'Function f(x)',
      examplePlaceholder: 'e.g. x^2 - 4',
      pointLabel: 'Point a',
      compute: 'Compute f′(a)',
      pointFiniteError: 'Enter a finite number for the point.',
      notDifferentiableError:
        'The derivative could not be estimated there (the function may not be differentiable at that point).',
      estimateError: 'The derivative could not be estimated there.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'Could not parse that expression.',
    },
  },
  integral: {
    seo: {
      title: 'Integral Calculator — Definite Integrals Online | Graphing Calculator',
      description:
        'Free online integral calculator: compute definite integrals ∫[a,b] f(x) dx ' +
        'numerically with adaptive Simpson’s rule, explained step by step.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators/' },
      { label: 'Integral Calculator', href: '/calculators/integral/' },
    ],
    heading: 'Integral Calculator',
    intro: [
      'The definite integral of f from a to b measures the signed area between the graph ' +
        'and the x-axis on that interval. Enter a function and bounds below to compute it ' +
        'numerically.',
    ],
    sections: [
      {
        heading: 'How the calculation works',
        body: [
          'This tool uses adaptive Simpson’s rule: it approximates the function with ' +
            'parabolas on small subintervals and recursively subdivides wherever the estimate ' +
            'is not yet accurate enough. It is the same quadrature routine behind the shaded ' +
            'integral regions in the graphing calculator, so the numbers agree.',
          'Because the method is adaptive, smooth functions converge quickly while tricky ' +
            'regions — sharp peaks, oscillations — automatically receive more subdivisions. The ' +
            'result is rounded to 6 decimal places; the underlying estimate is typically ' +
            'accurate well beyond that.',
        ],
      },
      {
        heading: 'Reading the result',
        body: [
          'Area above the x-axis counts positive and area below counts negative, so an ' +
            'integral can be zero even when the function is not — for example, ∫[−1,1] x³ dx = 0 ' +
            'because the two lobes cancel exactly. If you want total geometric area, integrate ' +
            'the absolute value instead.',
          'Integrals also accumulate quantities: if f(x) is a rate (liters per minute, say), ' +
            'the integral over a time interval is the total amount. Try f(x) = x² from 0 to 1 ' +
            '(result: 1/3 ≈ 0.333333) — a classic every calculus student meets.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this an exact antiderivative evaluation?',
        answer:
          'No — the tool integrates numerically with adaptive Simpson’s rule rather than ' +
          'finding a symbolic antiderivative. For well-behaved functions the approximation is ' +
          'accurate to many decimal places.',
      },
      {
        question: 'Why is my integral zero when the function clearly has area?',
        answer:
          'The definite integral is signed area: regions below the x-axis subtract from ' +
          'regions above it. Symmetric functions like sin(x) over [0, 2π] integrate to ' +
          'exactly zero for this reason.',
      },
      {
        question: 'What if the function is undefined somewhere in the interval?',
        answer:
          'Functions with singularities inside [a, b] (like 1/x across x = 0) do not have ' +
          'ordinary definite integrals there. The tool will report that the integral could ' +
          'not be estimated instead of returning a wrong number.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/root-finder/',
      '/learn/understanding-integrals/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Definite integral calculator',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'e.g. x^2',
      fromLabel: 'from a =',
      toLabel: 'to b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Compute integral',
      fillError: 'Enter a function and both bounds.',
      parseError: 'Could not parse f(x). Check the expression.',
      badBounds: 'The bounds a and b must be numbers.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'The integral could not be estimated on this interval.',
      loadFailedTitle: 'Integral tool failed to load',
      panelTitle: 'Integrate',
      functionNameLabel: 'Function f(x)',
      examplePlaceholder: 'e.g. x^2 - 4',
      lowerBoundLabel: 'Lower bound',
      upperBoundLabel: 'Upper bound',
      boundsFiniteError: 'Enter finite numbers for both bounds.',
      estimateError: 'The integral could not be estimated on that interval.',
      parseFallback: 'Could not parse that expression.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Root Finder — Solve f(x) = 0 Online | Graphing Calculator',
      description:
        'Free online root finder: enter any function f(x) and an interval to find all its ' +
        'roots (x-intercepts) using Brent’s method, with honest reporting.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calculators', href: '/calculators/' },
      { label: 'Root Finder', href: '/calculators/root-finder/' },
    ],
    heading: 'Root Finder',
    intro: [
      'A root of f is an x-value where f(x) = 0 — the points where the graph crosses or ' +
        'touches the x-axis. Enter a function and a search interval below to find every root ' +
        'inside it.',
    ],
    sections: [
      {
        heading: 'How the calculation works',
        body: [
          'The tool first scans the interval for sign changes, then refines each bracketed ' +
            'root with Brent’s method — a robust algorithm that combines the safety of ' +
            'bisection with the speed of secant and inverse-quadratic interpolation. It is the ' +
            'same routine the graphing calculator uses for its root analysis.',
          'Roots where the function merely touches the axis without changing sign (like x² ' +
            'at x = 0) are found by a separate extrema-aware scan, since pure sign-change ' +
            'detection would miss them. Every reported root is verified by evaluating f at the ' +
            'result.',
        ],
      },
      {
        heading: 'Tips for good results',
        body: [
          'Choose an interval that brackets the roots you care about: the tool only ' +
            'searches where you tell it to. For x² − 4 on [−10, 10] it finds −2 and 2; shrink ' +
            'the interval to [0, 10] and it reports just 2.',
          'If no roots are reported, either the function truly has none on the interval ' +
            '(like x² + 1 on the real line) or the roots sit exactly at your interval endpoints ' +
            '— nudge the bounds slightly and try again.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can it find complex (non-real) roots?',
        answer:
          'No — this tool finds real roots only. Functions like x² + 1 have no real roots, ' +
          'so the tool honestly reports none on any real interval.',
      },
      {
        question: 'Why did it miss a root I can see on the graph?',
        answer:
          'The most common cause is a root exactly at an interval endpoint or a root the ' +
          'scan step jumps over in a wildly oscillating function. Narrow the interval around ' +
          'the suspected root and search again.',
      },
      {
        question: 'How accurate are the reported roots?',
        answer:
          'Brent’s method converges to near machine precision; reported values are rounded ' +
          'to 6 decimal places. Plugging a reported root back into f(x) gives a value ' +
          'extremely close to zero.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/integral/',
      '/math-functions/quadratic/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Root finder',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'e.g. x^2 - 4',
      fromLabel: 'from',
      toLabel: 'to',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Find roots',
      fillError: 'Enter a function and a search interval.',
      parseError: 'Could not parse f(x). Check the expression.',
      badInterval: 'The interval bounds must be numbers.',
      rootsFoundTemplate: 'Found {count} root{plural}:',
      noneFound: 'No roots found on this interval.',
      loadFailedTitle: 'Root finder failed to load',
      panelTitle: 'Find roots',
      functionNameLabel: 'Function f(x)',
      intervalStartLabel: 'Interval start',
      intervalEndLabel: 'Interval end',
      intervalValidError: 'Enter a valid interval with lower bound < upper bound.',
      noRootsTemplate: 'No roots found in [{a}, {b}].',
      rootsListTemplate: 'Roots in [{a}, {b}]: {roots}',
      searchError: 'Roots could not be found on that interval.',
      parseFallback: 'Could not parse that expression.',
    },
  },
};
