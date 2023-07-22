/* jshint esversion:6 */

import { unsetToken, useFetchUser } from '@/helpers/auth';
import design from '@/layout/LoginForm.module.sass'
import Link from 'next/link';


export default function LoginForm(props) {

  const logout = () => {
      unsetToken();
  };
  const { user, loading} = useFetchUser();
  return (
    <div className={design.loginBody}>
      <div className={design.loginBox}>
        {!loading && !user ? (
          <div className="p-9" >
            <h2 className='text-center text-primary'>Login für Unterzeichnende</h2>
            <form onSubmit={props.handleSubmit} className="flex flex-col">
              <div className="form-floating my-3">
                  <input type="text" name="identifier" id="input-identifier" onChange={props.handleChange} required className="form-control-lg peer" placeholder=" " />
                  <label htmlFor="input-identifier" className="peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Benutzername</label>
              </div>

              <div className="form-floating my-3">
                  <input type="password" name="password" id="input-password" onChange={props.handleChange} required className="form-control-lg peer" placeholder=" " />
                  <label htmlFor="input-password" className="peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Passwort</label>
              </div>
              <button className="btn-lg btn-primary w-full my-3" type="submit">Anmelden</button>
            </form>
          </div>
          ) : ('') }
      
          {!loading && (user ? (
            <div className='my-8 text-center'>
              <h2 className='text-center text-primary'>Login für Unterzeichnende</h2>
              <p className='mb-4'>Sie sind bereits eingeloggt.</p>
              <Link className="btn btn-primary w-full my-3" href="#" onClick={logout}>
                Abmelden
              </Link>
            </div>) : ('')) }
      </div>
    </div>
  )
}