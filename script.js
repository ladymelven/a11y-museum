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
                 clickedTab.disabled = clickedTab === event.target;
                 clickedTab['aria-selected'] = clickedTab === event.target;
              });
          });
       });
    });
}


initTabs();