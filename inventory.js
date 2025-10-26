export function initializeInventory(elements) {
    let currentCategory = 'shirt';
    let currentCategoryItems = [];
    let currentItemIndex = 0;

    let touchStartX = 0;
    let touchEndX = 0;

    function updateInventoryDisplay() {
        elements.clothingItems.forEach(item => item.classList.remove('active'));

        currentCategoryItems = Array.from(elements.clothingItems).filter(item => item.dataset.itemType === currentCategory);

        if (currentCategoryItems.length > 0) {
            currentItemIndex = Math.max(0, Math.min(currentItemIndex, currentCategoryItems.length - 1));
            const currentItem = currentCategoryItems[currentItemIndex];
            if (currentItem) {
                currentItem.classList.add('active');
            }
        }

        elements.prevItemBtn.disabled = currentItemIndex === 0;
        elements.nextItemBtn.disabled = currentItemIndex >= currentCategoryItems.length - 1;
    }

    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentItemIndex = 0;
            updateInventoryDisplay();
        });
    });

    elements.prevItemBtn.addEventListener('click', () => {
        if (currentItemIndex > 0) {
            currentItemIndex--;
            updateInventoryDisplay();
        }
    });

    elements.nextItemBtn.addEventListener('click', () => {
        if (currentItemIndex < currentCategoryItems.length - 1) {
            currentItemIndex++;
            updateInventoryDisplay();
        }
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swiped left
            elements.nextItemBtn.click();
        }
        if (touchEndX > touchStartX + 50) { // Swiped right
            elements.prevItemBtn.click();
        }
    }

    elements.clothingPalette.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elements.clothingPalette.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    updateInventoryDisplay(); // Initial call
}