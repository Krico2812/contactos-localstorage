const STORAGE_KEY = 'contactos_data';

// Elementos del DOM
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const list = document.getElementById('contact-list');
const search = document.getElementById('search');
const emptyMsg = document.getElementById('empty');

// Modal
const modal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const editEmail = document.getElementById('edit-email');
const editPhone = document.getElementById('edit-phone');
const cancelEdit = document.getElementById('cancel-edit');

let editId = null;

// ========== VALIDACIONES ==========
nameInput.addEventListener('input', () => {
  nameInput.value = nameInput.value.replace(/[0-9]/g, '');
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
});

editName.addEventListener('input', () => {
  editName.value = editName.value.replace(/[0-9]/g, '');
});

editPhone.addEventListener('input', () => {
  editPhone.value = editPhone.value.replace(/[^0-9]/g, '');
});

// ========== FUNCIONES ==========
function loadContacts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function renderContacts(filter = '') {
  const contacts = loadContacts().filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  list.innerHTML = '';

  if (contacts.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }

  contacts.forEach(contact => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button class="action-btn edit" onclick="openEdit('${contact.id}')">Editar</button>
        <button class="action-btn delete" onclick="deleteContact('${contact.id}')">Eliminar</button>
      </td>
    `;
    list.appendChild(row);
  });
}

// ========== AGREGAR CONTACTO ==========
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert('Por favor completa todos los campos.');
    return;
  }

  if (/[0-9]/.test(name)) {
    alert('El nombre no puede contener números.');
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    alert('El número solo puede contener dígitos.');
    return;
  }

  const contacts = loadContacts();
  contacts.push({ id: Date.now().toString(), name, email, phone });
  saveContacts(contacts);
  renderContacts();
  form.reset();
});

// ========== EDITAR ==========
function openEdit(id) {
  const contact = loadContacts().find(c => c.id === id);
  if (!contact) return;

  editId = id;
  editName.value = contact.name;
  editEmail.value = contact.email;
  editPhone.value = contact.phone;
  modal.style.display = 'flex';
}

editForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = editName.value.trim();
  const email = editEmail.value.trim();
  const phone = editPhone.value.trim();

  if (!name || !email || !phone) {
    alert('Completa todos los campos antes de guardar.');
    return;
  }

  if (/[0-9]/.test(name)) {
    alert('El nombre no puede contener números.');
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    alert('El teléfono solo puede tener números.');
    return;
  }

  const contacts = loadContacts();
  const index = contacts.findIndex(c => c.id === editId);
  if (index !== -1) {
    contacts[index] = { id: editId, name, email, phone };
    saveContacts(contacts);
    renderContacts();
  }

  modal.style.display = 'none';
});

cancelEdit.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ========== ELIMINAR ==========
function deleteContact(id) {
  if (!confirm('¿Seguro que quieres eliminar este contacto?')) return;
  const contacts = loadContacts().filter(c => c.id !== id);
  saveContacts(contacts);
  renderContacts();
}

// ========== BUSCAR ==========
search.addEventListener('input', e => {
  renderContacts(e.target.value);
});

// ========== INICIO ==========
renderContacts();
