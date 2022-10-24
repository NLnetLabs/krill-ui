import React, { FormEvent, useState } from 'react';
import Notification from './Notification';
import Layout from './Layout';
import { krillHash } from '../core/utils';
import { KrillLogin } from '../core/types';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();
  const store = useStore();
  const t = useTranslations();
  const method = store.loginMethod as KrillLogin;

  const login = async (e: FormEvent) => {
    e.preventDefault();
    if (method.with_id) {
      navigate({
        password: await krillHash(username, password),
        username,
      });
    } else {
      navigate({ password });
    }
  };

  return (
    <Layout>
      <Notification notification={store.notification} />
      <form onSubmit={login} method="POST" className={`login card ${method.with_id ? 'vertical-form' : ''}`}>
        {method.with_id && (
          <div>
            <label htmlFor="admin required">
              {t.login.id}
            </label>
            <input
              name="token"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.login.idPlaceholder}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="token required">
            {t.login.password}
          </label>
          <input
            name="token"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.login.placeholder}
            required
          />
        </div>
        <div>
          <button type="submit" className="button">
            {t.login.signin}
          </button>
        </div>
      </form>
    </Layout>
  );
}
