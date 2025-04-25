'use client';

import { useState } from 'react';
import { signIn } from '@aws-amplify/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
        const user = await signIn({ username: email, password });
        setSuccess('Inicio de sesión exitoso. Bienvenida 🌺');
      console.log('Usuario:', user);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Entrar
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}
