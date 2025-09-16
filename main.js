/*
 * OWNEDGE Web Scripts
 *
 * This file implements interactive behaviour for the OWNEDGE
 * marketing website. It contains:
 *
 *  - Mobile sidebar toggling
 *  - Scroll‑triggered animations
 *  - Cookie banner dismissal
 *  - Placeholder functions for Stripe subscription
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Scroll animations – reveal elements with class 'hidden'
  const hiddenElements = document.querySelectorAll('.hidden');
  const observerOptions = {
    threshold: 0.2
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  hiddenElements.forEach(el => observer.observe(el));

  // Cookie banner
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    if (localStorage.getItem('ownedgeCookiesAccepted')) {
      cookieBanner.style.display = 'none';
    }
    const acceptBtn = cookieBanner.querySelector('button');
    acceptBtn && acceptBtn.addEventListener('click', () => {
      localStorage.setItem('ownedgeCookiesAccepted', 'yes');
      cookieBanner.style.display = 'none';
    });
  }
});

// Stripe placeholder functions
// To enable Stripe checkout, include the Stripe.js script on your
// pricing page and replace the publishable key and price IDs with
// your actual Stripe values. See README for details.
function subscribe(plan) {
  // This function expects a plan object of the form
  // { priceId: 'price_123', mode: 'subscription' }
  // It will redirect the user to Stripe Checkout.
  // Replace the following publishable key with your own.
  const stripePublicKey = 'pk_test_placeholder';
  const stripe = Stripe(stripePublicKey);
  stripe
    .redirectToCheckout({
      lineItems: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: window.location.origin + '/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: window.location.origin + '/cancel.html',
    })
    .then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    });
}