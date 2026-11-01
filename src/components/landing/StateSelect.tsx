'use client'

import type { UseFormRegisterReturn } from 'react-hook-form'

/**
 * A dropdown, not a free text box.
 *
 * The main site's quote form takes the state as two typed characters, which is
 * fine on a desktop keyboard. On a phone it is a field that produces "tx",
 * "Tex", "Texas" and "TX " from four people, and the mailing list work
 * downstream has to guess. A picker gives one spelling and, more to the point,
 * is one tap instead of a keyboard appearing.
 */

const STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'],
  ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'],
  ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'],
  ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'],
  ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
] as const

export default function StateSelect({
  id,
  registration,
  hasError,
  className,
}: {
  id: string
  registration: UseFormRegisterReturn
  hasError: boolean
  className: string
}) {
  return (
    <select
      id={id}
      defaultValue=""
      aria-invalid={hasError}
      className={className}
      {...registration}
    >
      <option value="" disabled>
        State
      </option>
      {STATES.map(([code, name]) => (
        <option key={code} value={code}>
          {code} &middot; {name}
        </option>
      ))}
    </select>
  )
}
