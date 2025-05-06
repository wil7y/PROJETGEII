// js/forum.js

// Variables globales
let currentUser = null;

// Authentification
firebase.auth().onAuthStateChanged(user => {
  currentUser = user;
  document.getElementById('comment-form').style.display = user ? 'block' : 'none';
  document.querySelector('#auth-section').style.display = user ? 'none' : 'block';
  loadMessages();
});

// Fonctions d’auth
function showLogin() {
  const email = prompt("Email");
  const password = prompt("Mot de passe");
  firebase.auth().signInWithEmailAndPassword(email, password).catch(console.error);
}
function showRegister() {
  const email = prompt("Email");
  const password = prompt("Mot de passe");
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(console.error);
}
function logout() {
  firebase.auth().signOut();
}

// Charger et afficher messages
function loadMessages() {
  const container = document.getElementById('messages');
  container.innerHTML = '';
  db.collection('messages').orderBy('date', 'desc').onSnapshot(snapshot => {
    container.innerHTML = '';
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement('div');
      div.innerHTML = `
        <p><b>${msg.nom}</b> (${msg.date.toDate().toLocaleString()})</p>
        <p>${msg.content}</p>
        <button onclick="likeMessage('${doc.id}')">👍 ${msg.likes || 0}</button>
        ${currentUser ? `<button onclick="reply('${doc.id}', '${msg.nom}')">Répondre</button>` : ''}
        <div id="comments-${doc.id}"></div>
      `;
      container.appendChild(div);
      loadComments(doc.id);
    });
  });
}

// Envoyer un message
function postMessage() {
  const content = document.getElementById('message-input').value;
  if (!content || !currentUser) return;
  db.collection('messages').add({
    nom: currentUser.email,
    content: content,
    date: new Date(),
    likes: 0
  });
  document.getElementById('message-input').value = '';
}

// Likes
function likeMessage(id) {
  const msgRef = db.collection('messages').doc(id);
  msgRef.update({ likes: firebase.firestore.FieldValue.increment(1) });
}

// Charger commentaires
function loadComments(messageId) {
  db.collection('comments').where('messageId', '==', messageId).orderBy('date').onSnapshot(snapshot => {
    const container = document.getElementById(`comments-${messageId}`);
    container.innerHTML = '';
    snapshot.forEach(doc => {
      const c = doc.data();
      const div = document.createElement('div');
      div.innerHTML = `
        <p><b>${c.nom}</b> (${c.date.toDate().toLocaleString()})</p>
        <p>${c.content}</p>
      `;
      container.appendChild(div);
    });
  });
}

// Répondre
function reply(messageId, nom) {
  const content = prompt(`Répondre à ${nom}`);
  if (content && currentUser) {
    db.collection('comments').add({
      messageId: messageId,
      nom: currentUser.email,
      content: content,
      date: new Date()
    });
  }
}