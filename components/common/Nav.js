import { unsetToken, useFetchUser } from '@/helpers/auth'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Firmen', href: '/companies', current: false },
  { name: 'Personen', href: '/persons', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav({nopageHeader, backend}) {
  const router = useRouter();
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === router.pathname ||
    (router.pathname.startsWith("/companies") && item.href === "/companies") ||
    (router.pathname.startsWith("/persons") && item.href === "/persons")
  }));
  const logout = () => {
    unsetToken();
  };
  const {user} = useFetchUser()
  return (
    <Disclosure as="nav" className={`bg-primary-600 ${nopageHeader ? 'rounded-b-lg' : ''}`}>
      {({ open }) => (
        <>
          <div className="nav-wrapper border-zinc-100/10 border-y">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 nav-theme">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  
                  {backend ? (
                    <Link class="flex" href="/legal">
                      <img className="block h-8 w-auto" src="/icons/icon-light.svg" alt="COMDOCK Legal" />
                      <span className="ml-6 my-auto text-xl font-medium text-zinc-100">COMDOCK Legal</span>
                    </Link>
                  ) : (
                    <Link href="/">
                      <img className="block h-8 w-auto" src="/icons/icon-light.svg" alt="COMDOCK Index" />
                    </Link>
                  )}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {!backend && updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'nav-item-active' : 'nav-item',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-auto sm:block">
                  <div className="flex space-x-4">
                    {!backend ? ( 
                      <Link href="/legal" className="nav-item rounded-md px-3 py-2 text-sm font-medium">
                        COMDOCK Legal
                      </Link>
                    ) : (
                      <>
                        <Link href="/" className="nav-item rounded-md px-3 py-2 text-sm font-medium" target="_blank">
                          COMDOCK Index öffnen
                        </Link>
                        { user ? (
                        <Link onClick={logout} href="#" className="nav-item rounded-md px-3 py-2 text-sm font-medium">
                          Abmelden
                        </Link>
                        ) : ''}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {updatedNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'nav-item-active' : 'nav-item',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
