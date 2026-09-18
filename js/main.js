/**
 * KLOUDEP Website
 * Main JavaScript
 *
 * Handles the responsive navigation menu.
 */

const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.links');


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

if (menuButton && navigation) {

  /**
   * Open or close the mobile navigation menu.
   */
  menuButton.addEventListener('click', () => {

    const isOpen = navigation.classList.toggle('open');

    menuButton.setAttribute(
      'aria-expanded',
      isOpen.toString()
    );

  });


  /**
   * Close the mobile navigation after a link is selected.
   */
  const navigationLinks = navigation.querySelectorAll('a');

  navigationLinks.forEach((link) => {

    link.addEventListener('click', () => {

      navigation.classList.remove('open');

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });

}
