import Image from 'next/image'
import Link from 'next/link'

const benefits = [
  ['PERSONAL TOUCH', 'Handwritten & personalized'],
  ['THE RIGHT HOMES', 'Targeted mailing lists'],
  ['PRINT TO POSTAGE', 'One connected process'],
  ['REAL PEOPLE', 'Personal campaign support'],
]

export default function ApprovedHero() {
  return (
    <div className="ggm-approved">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="copy">
          <p className="eyebrow">DIRECT MAIL THAT FEELS PERSONAL</p>
          <h1 id="hero-heading">Less Scrolling.<br /><em>More Opening.</em></h1>
          <p className="intro">A handwritten envelope. A personal letter. A postcard worth keeping. Put your business in their hands—and on their minds.</p>
          <div className="actions">
            <Link className="button" href="/contact#quote-form">Get a Free Quote <span aria-hidden="true">↗</span></Link>
            <Link className="textlink" href="/products">Explore Products</Link>
          </div>
          <div className="checks"><span><b aria-hidden="true">✓</b> Design &amp; print</span><span><b aria-hidden="true">✓</b> Lists &amp; addressing</span><span><b aria-hidden="true">✓</b> Mailing, handled</span></div>
        </div>
        <div className="photo">
          <Image src="/products/approved-opening.jpg" alt="A handwritten letter, a postcard and a stamped envelope on a sunlit table, with a green plant in the background" fill priority sizes="(max-width: 700px) 100vw, 52vw" />
          <div className="photo-label">FROM YOUR BUSINESS, WITH CARE.<strong>A better first impression.</strong></div>
        </div>
      </section>
      <div className="benefits" aria-label="Our services">
        {benefits.map(([title, description], index) => <div className="benefit" key={title}><span className="number" aria-hidden="true">0{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></div>)}
      </div>
      <section className="story" aria-labelledby="mailbox-heading"><span className="label">SOMETHING REAL. SOMETHING REMEMBERED.</span><h2 id="mailbox-heading">From Their Mailbox.<br /><em>To Their Mind.</em></h2><p>Personal mail makes room for a real connection.<br />We handle the details. You grow your business.</p></section>
    </div>
  )
}
