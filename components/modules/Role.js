import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function Role({ selectedRole, setSelectedRole, roles }) {
    return (
        <Listbox value={selectedRole} onChange={setSelectedRole}>
            <div className="relative w-full mt-4">
                <Listbox.Button className="relative w-full cursor-default py-2 pl-10 pr-3 text-left rounded-md border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-right">{selectedRole}</span>
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {roles.map((role, roleIdx) => (
                            <Listbox.Option
                                key={roleIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={role}
                            >
                                {({ selectedRole }) => (
                                    <>
                                        <span
                                            className={`block truncate text-right ${selectedRole ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {role}
                                        </span>
                                        {selectedRole ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}