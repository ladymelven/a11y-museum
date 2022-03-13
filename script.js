const initTabs = () => {
    const tablists = document.querySelectorAll('[role="tablist"]');

    tablists.forEach((tablist) => {
       const tabs = tablist.querySelectorAll('[role="tab"]');
       const panels = tablist.parentElement.querySelectorAll('[role="tabpanel"]');

       tabs.forEach((tab) => {
          tab.addEventListener('click', (event) => {
              const panelId = event.target.dataset.panelId;

              panels.forEach((panel) => {
                 panel.style.display = panel.id === panelId ? 'block' : 'none';
              });

              tabs.forEach((clickedTab) => {
                 clickedTab === event.target ? clickedTab.classList.add('active') : clickedTab.classList.remove('active');
                 clickedTab['aria-selected'] = clickedTab === event.target;
              });
          });
       });
    });
}

const initModals = () => {
    const modalButtons = document.querySelectorAll('[data-dialog]');
    const modals = document.querySelectorAll('dialog');

    modalButtons.forEach((button) => {
        const modal = document.getElementById(button.dataset.dialog);
        const closeButton = modal.querySelector('[data-close-dialog]');
        const trap = window.focusTrap.createFocusTrap(modal, {
            returnFocusOnDeactivate: true,
            setReturnFocus: button,
        });

        button.addEventListener('click', () => {
            modal.showModal();
            trap.activate();
        });

        closeButton.addEventListener('click', () => {
            modal.close();
        });

        modal.addEventListener('close', () => {
            trap.deactivate();
        });
    });
}


initTabs();
initModals();
