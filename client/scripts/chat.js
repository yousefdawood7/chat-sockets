import { socket } from './socket';

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const headerName = document.getElementById('headerName');
const headerStatus = document.getElementById('headerStatus');

let typingEl = null;

document.addEventListener('DOMContentLoaded', () => {
  messageInput.addEventListener('input', handleInputChange);
  messageInput.addEventListener('keydown', handleKeyDown);
  sendBtn.addEventListener('click', handleSend);
});

function handleInputChange() {
  // Auto-resize textarea
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';

  // Toggle send button
  sendBtn.disabled = messageInput.value.trim().length === 0;

  socket.emit('typing', { id: socket.id, isTyping: true });
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

function handleSend() {
  const text = messageInput.value.trim();
  if (!text) return;

  removeEmptyState();
  appendMessage(text, 'sent');
  messageInput.value = '';
  messageInput.style.height = 'auto';
  sendBtn.disabled = true;

  scrollToBottom();
}
function addIncomingMessage(text) {
  removeEmptyState();
  hideTypingIndicator();
  appendMessage(text, 'received');
  scrollToBottom();
}

export function showTypingIndicator() {
  if (typingEl) return;
  typingEl = document.createElement('div');
  typingEl.className = 'typing-indicator';
  typingEl.innerHTML =
    '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatMessages.appendChild(typingEl);
  scrollToBottom();
}

function hideTypingIndicator() {
  if (typingEl) {
    typingEl.remove();
    typingEl = null;
  }
}

function setHeaderInfo(name, online) {
  headerName.textContent = name;
  headerStatus.innerHTML = online
    ? '<span class="status-dot"></span> Online'
    : '<span class="status-dot" style="background:#888;box-shadow:none;animation:none"></span> Offline';
}

function appendMessage(text, type) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${type}`;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  const time = document.createElement('span');
  time.className = 'message-time';
  time.textContent = formatTime(new Date());

  wrapper.appendChild(bubble);
  wrapper.appendChild(time);
  chatMessages.appendChild(wrapper);
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function showEmptyState() {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.id = 'emptyState';
  el.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <p>No messages yet.<br>Start the conversation!</p>
  `;
  chatMessages.appendChild(el);
}

function removeEmptyState() {
  const el = document.getElementById('emptyState');
  if (el) el.remove();
}
