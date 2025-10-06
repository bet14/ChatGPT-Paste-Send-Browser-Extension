// ========== NÚT GỬI ==========
const createPasteButton = () => {
  const btn = document.createElement('button');
  btn.id = 'gpt-paste-btn';
  Object.assign(btn.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '2147483647',
    padding: '12px 24px',
    background: 'rgba(37, 99, 235, 0.15)',
    color: '#2563eb',
    border: '1px solid rgba(37, 99, 235, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.background = 'rgba(37, 99, 235, 0.3)';
    btn.style.color = '#1d4ed8';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'rgba(37, 99, 235, 0.15)';
    btn.style.color = '#2563eb';
  });

  btn.textContent = '📋 Paste & Send';
  return btn;
};

// ========== TÌM TEXTAREA GPT ==========
function findPromptInput() {
  const possibleSelectors = [
    'textarea[placeholder*="Message"]',
    'textarea[placeholder*="Send a message"]',
    'textarea',
    'div[contenteditable="true"]'
  ];

  for (const selector of possibleSelectors) {
    const el = document.querySelector(selector);
    if (el) return el;
  }

  return null;
}

// ========== TÌM NÚT GỬI GPT ==========
function findSubmitButton() {
  const buttons = Array.from(document.querySelectorAll("button"));
  return buttons.find(b =>
    b.textContent.trim().toLowerCase() === 'send' ||
    b.getAttribute("aria-label")?.toLowerCase().includes("send")
  );
}

// ========== DÁN & GỬI ==========
async function handlePasteAndSend() {
  try {
    const text = await navigator.clipboard.readText();
    const textarea = findPromptInput();

    if (!textarea) return showError("Không tìm thấy ô nhập");

    // ===== LẤY THÔNG TIN VỊ TRÍ & STYLE CỦA TEXTAREA =====
    const element = textarea;
    const parent = element.parentElement;
    const styles = window.getComputedStyle(element);
    const parentStyles = parent ? window.getComputedStyle(parent) : {};
    const rect = element.getBoundingClientRect();

    const data = {
      elementSelector: element.tagName.toLowerCase(),
      parentSelector: parent ? `${parent.tagName.toLowerCase()}${parent.id ? '#' + parent.id : ''}` : null,
      elementPosition: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      },
      elementStyles: {
        position: styles['position'],
        display: styles['display'],
      },
      parentStyles: {
        position: parentStyles['position'],
        display: parentStyles['display'],
      }
    };

    console.log("Thông tin vị trí và style textarea:", data);
    // ======================================================

    textarea.focus();

    if (textarea.tagName.toLowerCase() === 'textarea') {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(textarea.__proto__, 'value').set;
      nativeInputValueSetter.call(textarea, text);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (textarea.getAttribute('contenteditable') === 'true') {
      textarea.innerHTML = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    setTimeout(() => {
      const btn = findSubmitButton();
      if (btn) {
        btn.click();
      } else {
        showError("Không tìm thấy nút gửi");
      }
    }, 2000);
  } catch (err) {
    showError("Lỗi: " + err.message);
  }
}

// ========== TẠO VÀ GẮN NÚT ==========
function init() {
  if (document.getElementById('gpt-paste-btn')) return;

  const btn = createPasteButton();
  btn.addEventListener('click', handlePasteAndSend);
  document.body.appendChild(btn);
}

// ========== LỖI ==========
function showError(msg) {
  const box = document.createElement('div');
  box.innerHTML = `
    <div style="position: fixed; top: 70px; left: 50%; transform: translateX(-50%);
      background: #fef2f2; color: #dc2626; padding: 12px; border-radius: 8px;
      border: 1px solid #fca5a5; max-width: 400px; z-index: 2147483647;">
      <strong>LỖI:</strong> ${msg}
    </div>
  `;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4000);
}

// ========== QUAN SÁT DOM ==========
const observer = new MutationObserver(() => {
  if (!document.getElementById('gpt-paste-btn')) {
    init();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  init();
  observer.observe(document.body, { childList: true, subtree: true });
}
