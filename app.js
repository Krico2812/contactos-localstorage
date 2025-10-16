const STORAGE_KEY = 'contactos_data';

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const list = document.getElementById('contact-list');
const search = document.getElementById('search');
const emptyMsg = document.getElementById('empty');

// Cargar contactos desde localStorage
function loadContacts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar contactos
function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

// Renderizar
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
    const li = document.createElement('li');
    li.className = 'contact-item';

    li.innerHTML = `
      <div>
        <strong>${contact.name}</strong><br>
        ${contact.email}<br>
        ${contact.phone}
      </div>
      <div>
        <button class="btn edit" onclick="editContact('${contact.id}')">Editar</button>
        <button class="btn delete" onclick="deleteContact('${contact.id}')">Eliminar</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Agregar contacto
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) return alert('Todos los campos son obligatorios.');

  const contacts = loadContacts();
  contacts.push({
    id: Date.now().toString(),
    name, email, phone
  });
  saveContacts(contacts);
  renderContacts();
  form.reset();
});

// Editar contacto
function editContact(id) {
  const contacts = loadContacts();
  const contact = contacts.find(c => c.id === id);
  if (!contact) return;

  const newName = prompt('Editar nombre:', contact.name);
  const newEmail = prompt('Editar correo:', contact.email);
  const newPhone = prompt('Editar teléfono:', contact.phone);

  if (!newName || !newEmail || !newPhone) return;

  contact.name = newName;
  contact.email = newEmail;
  contact.phone = newPhone;

  saveContacts(contacts);
  renderContacts();
}

// Eliminar contacto
function deleteContact(id) {
  if (!confirm('¿Seguro que quieres eliminar este contacto?')) return;
  const contacts = loadContacts().filter(c => c.id !== id);
  saveContacts(contacts);
  renderContacts();
}

// Buscar contacto
search.addEventListener('input', e => {
  renderContacts(e.target.value);
});

// Cargar al inicio
renderContacts();
