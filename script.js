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
            escapeDeactivates: false,
            setReturnFocus: button,
        });
        window.dialogPolyfill.registerDialog(modal);

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

const messageUser = (message, anchor = document.body) => {
    if (document.getElementById('message')) {
        document.getElementById('message').remove();
    }
    
    const messageNode = document.createElement('p');
    messageNode.id = 'message';
    messageNode.classList.add('hidden');
    messageNode.role = 'status';
    messageNode.ariaLive = 'polite';
    messageNode.innerText = message;
    
    anchor.appendChild(messageNode);
    
    setTimeout(() => {
        if (messageNode) {
            messageNode.remove();
        }
    }, 5000);
}

const initFilters = () => {
    const filterGroups = document.querySelectorAll('.js-filters');
    
    filterGroups.forEach((group) => {
        const filters = group.querySelectorAll('input[type="radio"]');
        const filteredNodes = group.querySelectorAll('[data-filtered="true"]');
        
        filters.forEach((button) => {
            button.addEventListener('change', (event) => {
                const clickedButton = event.target;
                
                if (clickedButton.checked === false) return; 
                    
                const buttonValues = clickedButton.value.split(',');
                
                filteredNodes.forEach((node) => {
                    node.style.display = buttonValues.includes(node.id) ? 'block' : 'none';
                });
                
                messageUser(`Найдено ${buttonValues.length} элементов`, group);
            });
        });
    });
}
 

initTabs();
initModals();
initFilters();
