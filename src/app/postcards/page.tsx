import { business } from '@/config/business'
import { PACKAGES } from '@/lib/postcards/packages'
import PostcardRequest from '@/components/postcards/PostcardRequest'

/**
 * /postcards: the postcard campaign REQUEST page (request only).
 *
 * Estimated prices come from the approved price list in code. Nothing on this
 * page takes payment; requests are reviewed by our team, who confirm the final
 * price, timing and payment arrangements with the customer.
 */
export default function PostcardsPage() {
  return (
    <PostcardRequest
      packages={PACKAGES}
      phone={business.phone}
      phoneHref={business.phoneHref}
      email={business.email}
      testMode={process.env.POSTCARDS_TEST_MODE === '1'}
    />
  )
}
