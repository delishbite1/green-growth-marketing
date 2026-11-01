/**
 * Full pages for the trades GGM actually sells to.
 *
 * The 82 entries in industries.ts are one sentence each, which is right for a
 * grid and nowhere near enough for a page. Publishing 82 pages that differ by a
 * swapped paragraph would be thin content, and Google treats a set of those as
 * doorway pages and can hold the whole site back. So only trades with a real
 * guide written for them get a page, and the rest stay on the hub.
 *
 * Adding a trade here creates its page, puts it in the sitemap and links it
 * from the hub. Adding one to industries.ts alone does nothing, deliberately.
 *
 * ---------------------------------------------------------------------------
 * NO INVENTED NUMBERS. Anywhere.
 *
 * This site had fabricated statistics and testimonials stripped out of it
 * before launch, and putting "roofers see a 3% response rate" back in would
 * undo that for the sake of a sentence. Everything here is about who to reach,
 * when to reach them and what to say, which is knowledge rather than a claim.
 * The only figures are ranges of quantity, framed as what a campaign of that
 * size looks like, never as what it will return.
 */

export type IndustryGuide = {
  /** URL segment. Also the key that ties this to industries.ts by name. */
  slug: string
  /** Must match an entry in industries.ts exactly. */
  industry: string
  /** Page title and H1. */
  title: string
  /** Meta description, 140 to 160 characters. */
  metaDescription: string
  /** The opening, two or three sentences. */
  intro: string
  /** Who the mail should go to, and why those people. */
  audience: string
  /** When in the year this trade should be mailing, and why. */
  timing: string
  /** What belongs on the piece itself. */
  message: string
  /** What a campaign of a given size looks like in practice. */
  volume: string
  /** Three or four concrete campaign ideas. */
  ideas: string[]
}

export const industryGuides: IndustryGuide[] = [
  {
    slug: 'roofing',
    industry: 'Roofing',
    title: 'Direct Mail for Roofing Companies',
    metaDescription:
      'Direct mail for roofers: who to target, when to mail after a storm, and what to put on the piece. Design, list, print and postage included. Free quote.',
    intro:
      'Roofing is bought twice: in a panic after a storm, and slowly by a homeowner who has been watching a stain on the ceiling grow for two years. Those are different people and they need different mail. Most roofing campaigns fail because they are written for the first and sent to the second.',
    audience:
      'Homeowners, owner occupied, in houses old enough to need the work. Roofs are replaced roughly every twenty to thirty years depending on the material, so the year a house was built is the single most useful filter available, and it is one most roofers never ask for. Rentals are usually worth excluding: the person who opens the mail is not the person who decides. After a storm, the filter becomes geography rather than age, and the tighter you draw it the better it performs.',
    timing:
      'Two clocks. The seasonal one runs late winter into spring, when people look up after the weather and before the summer trades get busy. The other one is a storm, and it does not care what month it is. Storm mail has a short window, roughly the fortnight while it is still the thing people are talking about, so a campaign that takes three weeks to get out has missed it. That is worth setting up before you need it rather than after.',
    message:
      'A free inspection is the workhorse offer, because it asks for nothing and it is the actual next step anyway. Insurance is the other lever: many homeowners do not know their policy may cover storm damage, and a piece that says so plainly is doing them a favour rather than selling to them. Put a photograph of a real roof you did, in the area you are mailing. A recognisable street does more than any adjective.',
    volume:
      'For a normal neighbourhood push, 2,000 to 5,000 pieces covers a working territory without spreading you thin. For a storm response, go narrower and heavier: every home in the affected streets, sent at once. Splitting a list across two or three drops a fortnight apart usually beats one drop, because roofing is a decision people put off and a second piece catches them at a different moment.',
    ideas: [
      'Free roof inspection, mailed to homes over twenty years old',
      'Storm response to the streets that were hit, sent within days',
      'Insurance claim help, explaining what a policy may already cover',
      'Before and after photographs from a job on the same streets',
    ],
  },
  {
    slug: 'home-remodeling',
    industry: 'Home Remodeling',
    title: 'Direct Mail for Home Remodeling Companies',
    metaDescription:
      'Direct mail for remodelers: reaching homeowners with equity, what to show them, and how to time it. Design, list, print and postage included.',
    intro:
      'A remodel is one of the largest discretionary purchases a household makes, and almost nobody decides on the day they first think about it. Mail works here because it survives. A postcard on the fridge for four months is doing something an advertisement seen for two seconds cannot.',
    audience:
      'Homeowners with the means and the reason. Length of residence matters more than most people expect: households seven to fifteen years in are past the moving-in phase, have equity, and have lived with the kitchen long enough to resent it. New movers are the other end of the same spectrum and want different work, so mail them separately with different words rather than lumping them together.',
    timing:
      'Kitchens and interior work sell in autumn and winter, when people are indoors looking at them and thinking about hosting. Additions and anything structural sells earlier in the year, because people want it finished before the weather turns. Sending a kitchen piece in June is not wrong exactly, it is just competing against the garden.',
    message:
      'Show the work. Remodeling is the one trade where the photograph carries the piece and the words are support. Before and after, on real projects, ideally near where you are mailing. Avoid pricing on the piece, because a number without a scope reads as either expensive or too good to be true, and both cost you the call. A free design consultation is the natural ask.',
    volume:
      'Smaller and more repeated than most trades. 1,000 to 3,000 well chosen homes mailed three or four times across a year will normally beat 10,000 mailed once, because you are waiting for a decision that arrives on its own schedule rather than creating one.',
    ideas: [
      'Kitchen and bathroom before and after, mailed in autumn',
      'Homeowners seven to fifteen years in the same house',
      'Neighbourhood piece after finishing a visible local project',
      'Free design consultation with no obligation',
    ],
  },
  {
    slug: 'hvac',
    industry: 'A/C & Heating / HVAC',
    title: 'Direct Mail for HVAC and Air Conditioning Companies',
    metaDescription:
      'Direct mail for HVAC: tune-up season timing, targeting older systems, and building a maintenance base. Design, list, print and postage included.',
    intro:
      'HVAC has the clearest seasons of any trade, and the mistake almost everyone makes is mailing during them. By the time it is a hundred degrees, the homeowner with a dying compressor is already calling whoever answers first. The mail that wins arrives about six weeks before that.',
    audience:
      'Homeowners in houses old enough that the original system is near the end of its life, which is generally ten to fifteen years. Age of home is the practical stand-in for age of system and it is easy to filter. Beyond that, your own past customers are the most valuable list you own and the one most often ignored: somebody you fitted a system for eight years ago is a replacement waiting to happen and they already trust you.',
    timing:
      'Mail cooling in early spring and heating in early autumn, ahead of the first real hot or cold week. Two campaigns a year, both early. The emergency work will come regardless and mostly to whoever is nearest; what mail buys you is the planned work, and planned work is decided in the quiet weeks.',
    message:
      'A tune-up at a fixed, low, obviously fair price is the best offer in this trade, because it gets you inside the house. From there the conversation about a fifteen year old system is a natural one rather than a sales pitch. Maintenance plans are the other prize: they turn a one-off into a relationship and they are far easier to sell on paper than on the phone.',
    volume:
      '3,000 to 6,000 per seasonal push for a normal service area, plus a separate, much smaller mailing to your own past customers, which should go out every year without fail. That second list is small, cheap and consistently the better performer.',
    ideas: [
      'Pre-season tune-up at a fixed price, mailed six weeks early',
      'Past customers with systems now ten years and older',
      'Maintenance plan offer with the yearly saving shown plainly',
      'New movers, who have inherited a system they know nothing about',
    ],
  },
  {
    slug: 'plumbing',
    industry: 'Plumbing',
    title: 'Direct Mail for Plumbing Companies',
    metaDescription:
      'Direct mail for plumbers: staying top of mind before the emergency, water heater targeting, and what to put on the fridge. Free quote.',
    intro:
      'Nobody chooses a plumber in advance. They choose one at the moment water is somewhere it should not be, and they choose whoever they can find fastest. Mail is how you become the thing they can find fastest, which means the goal is not a call this week. It is being on the fridge in March when the pipe goes.',
    audience:
      'Homeowners, weighted towards older housing stock where the plumbing is original. Water heaters are the most predictable replacement in the house, generally eight to twelve years, so home age is again the most useful filter you have. Past customers matter as much here as in HVAC, and for the same reason.',
    timing:
      'Less seasonal than most trades, with two exceptions. The first freeze of the year produces burst pipes and a spike in searching, so mail should land before it, not after. And water heater replacement is worth a push in autumn, when nobody wants a cold shower in January.',
    message:
      'This is the one trade where a fridge magnet or a piece designed to be kept genuinely outperforms a clever offer. Make the phone number enormous. Say the words people will be searching for in a panic: emergency, same day, twenty four hours, if those are true. A modest offer on a planned job, like a water heater flush or a drain clean, gives the piece a reason to be opened now while it earns its place on the fridge for later.',
    volume:
      '2,000 to 5,000 per drop, repeated two or three times a year to the same homes. Repetition matters more here than reach, because you are not trying to catch a decision, you are trying to be remembered at an unpredictable moment.',
    ideas: [
      'Keep this number piece, built to be kept rather than read',
      'Water heater replacement to homes ten years and older',
      'Before the freeze, mailed ahead of the first cold snap',
      'Drain cleaning at a fixed price to open the relationship',
    ],
  },
  {
    slug: 'landscaping',
    industry: 'Landscaping / Lawn Care',
    title: 'Direct Mail for Landscaping and Lawn Care Companies',
    metaDescription:
      'Direct mail for lawn care: mailing before the season, winning whole streets, and turning one-off jobs into contracts. Free quote.',
    intro:
      'Lawn care is the trade where mail and the work itself reinforce each other more than anywhere else, because your customers are visible from the street. A neighbour who sees a good lawn every day and then gets a piece of mail from the company that does it is a far warmer prospect than the same person mailed at random.',
    audience:
      'Homeowners, and then geography above everything else. Density is the whole economics of this trade: ten customers on one street is a profitable morning and ten customers across a city is a day of driving. Mail tightly around the routes you already run, not evenly across a service area. Income and home value are worth layering in for design and installation work, less so for maintenance.',
    timing:
      'Late winter, before the first mow anyone is thinking about. Contracts for the year get decided in a short window as soon as people notice the grass growing, and the company already in their mind wins by default. A second, smaller push in early autumn picks up cleanup and overseeding.',
    message:
      'Sell the season, not the visit. A price per cut invites comparison with the cheapest person with a trailer; a programme for the year with the schedule laid out is a different product and a much harder one to undercut. If you have done work on the street you are mailing, say so. Naming the street is the strongest sentence available to this trade and it costs nothing.',
    volume:
      'Smaller and tighter than most: 500 to 2,000 pieces concentrated on the streets around existing routes will outperform a much larger scattered mailing. This is the trade where a small precise list genuinely beats a big one.',
    ideas: [
      'Season programme with the year mapped out, mailed in late winter',
      'The streets around a route you already service',
      'We are already on your street, naming it plainly',
      'Autumn cleanup and overseeding to existing customers',
    ],
  },
  {
    slug: 'pool-service',
    industry: 'Pool Service',
    title: 'Direct Mail for Pool Service Companies',
    metaDescription:
      'Direct mail for pool companies: finding homes with pools, opening season timing, and selling weekly service. Free quote.',
    intro:
      'Pool service has one advantage almost no other trade has: you can find your customers precisely. A home either has a pool or it does not, and that is knowable before you spend a stamp. It also has one trap, which is that everybody mails in the same fortnight.',
    audience:
      'Homes with pools, which can be filtered directly rather than guessed at from income or home value. That single filter makes this one of the cheapest trades to mail well, because almost nothing is wasted. Layer geography on top to keep routes tight, since weekly service has the same density economics as lawn care.',
    timing:
      'Ahead of opening season, and earlier than feels natural. By the time the weather turns, people have already called someone. A second window exists at closing, and it is less contested because most companies forget it, which makes it cheaper to be heard in.',
    message:
      'Weekly service is the product worth selling; openings and repairs are how you get in. Price the opening clearly and make the weekly plan the obvious next step rather than a separate pitch. Reliability is the real anxiety in this trade, since the previous company probably stopped turning up, so saying plainly what you do and when you do it beats any adjective.',
    volume:
      '1,000 to 3,000 is usually a whole territory once the list is filtered to homes with pools, which is a fraction of the households. Small, precise and repeated at both ends of the season.',
    ideas: [
      'Opening special, mailed before the first warm week',
      'Weekly service plan with the schedule stated plainly',
      'Closing and winterisation, when nobody else is mailing',
      'Homes with pools whose service looks neglected',
    ],
  },
  {
    slug: 'exterior-painting',
    industry: 'Exterior Painting',
    title: 'Direct Mail for Painting Companies',
    metaDescription:
      'Direct mail for painters: targeting homes that need it, seasonal timing, and why the photograph carries the piece. Free quote.',
    intro:
      'Exterior painting is unusual because the need is visible from the road. You can look down a street and know which houses are candidates, which means a well chosen list is doing something no broad campaign can, and it means the photograph on the piece has to be good enough to make somebody look at their own house differently.',
    audience:
      'Homeowners in older housing stock, filtered by age of home, because paint has a life and it runs out on a schedule. Neighbourhoods built in the same few years age together, which is why a whole street often becomes viable at once. That is worth planning around rather than discovering.',
    timing:
      'Spring, ahead of the season rather than during it, and early autumn in climates with a second window. Book work before the calendar fills, because a painter with a full summer is not the one who needed the mail.',
    message:
      'One large photograph, before and after, of a house that looks like theirs. That is most of the piece. A free written estimate is the right ask, since price is the anxiety and an estimate resolves it without commitment. Say how long the job takes: people imagine weeks of disruption and the real answer is usually reassuring.',
    volume:
      '2,000 to 4,000 across neighbourhoods of the right age. Where a street is clearly due, mail all of it rather than sampling: painting is a decision neighbours make while looking at each other.',
    ideas: [
      'Before and after on a house of the same era and style',
      'Whole streets in neighbourhoods built the same year',
      'Free written estimate with the timescale stated',
      'Book now for spring, mailed in late winter',
    ],
  },
  {
    slug: 'garage-doors',
    industry: 'Garage Doors',
    title: 'Direct Mail for Garage Door Companies',
    metaDescription:
      'Direct mail for garage door companies: repair versus replacement, targeting by home age, and the offer that gets you on the driveway.',
    intro:
      'A garage door is the largest moving object in a house and the one nobody thinks about until it stops. That makes this trade a mix of the plumbing problem, being remembered at an unpredictable moment, and the painting problem, where the need is visible from the road.',
    audience:
      'Homeowners, filtered by age of home, since openers and springs have a service life and doors of a certain era are recognisable on sight. Neighbourhoods built together fail together, which is the same pattern painting sees and is just as useful here.',
    timing:
      'Springs break in cold weather, so late autumn and winter carry the emergency work. Replacement and upgrade sell better in spring, when people are looking at the front of the house. Two campaigns with different messages beats one campaign sent twice.',
    message:
      'Separate the two jobs. A repair offer wants a price and a promise about how fast you can get there. A replacement piece wants a photograph, because a new door changes the front of a house more than almost any other spend of that size, and most people have never considered that. A tune-up at a modest price is the way onto the driveway, where the conversation about the door itself happens naturally.',
    volume:
      '2,000 to 5,000 per push. This trade rewards repetition over reach for the repair side and precision for the replacement side, so it is worth running them as two lists rather than one.',
    ideas: [
      'Spring and opener tune-up at a fixed price',
      'New door photographs showing the change to the front of a house',
      'Homes of an age where the original door is failing',
      'Same day repair, mailed into winter',
    ],
  },
  {
    slug: 'pest-control',
    industry: 'Pest Control',
    title: 'Direct Mail for Pest Control Companies',
    metaDescription:
      'Direct mail for pest control: seasonal timing, selling the annual plan, and mailing around a confirmed problem. Free quote.',
    intro:
      'Pest control sells on two completely different feelings. One is urgent and slightly panicked, and it converts immediately. The other is quiet prevention, and it is worth far more, because it is an annual plan rather than a visit. Most mail in this trade only speaks to the first.',
    audience:
      'Homeowners, with geography doing most of the work, because pests are local in a way that other problems are not. If you have treated an infestation on a street, the neighbours have the same problem whether or not they have noticed yet, and that is the most responsive list this trade has access to. Beyond that, homes with gardens and older properties skew higher.',
    timing:
      'Ahead of each season rather than during it, since a household that already has ants has already called someone. Spring for general treatment, early summer for mosquitoes, autumn for the things that come indoors when it cools. Termite messaging follows the local swarm season, which is worth mailing just before.',
    message:
      'The annual plan is the product. A single treatment is a transaction and a plan is a relationship, and the plan is easier to explain on paper than on a phone call because the year can be laid out visually. Where you are mailing around a real confirmed problem nearby, say so plainly and without exaggeration. It is true, it is useful, and it needs no adjectives.',
    volume:
      '3,000 to 6,000 for a seasonal push, and much smaller and tighter when mailing around a confirmed local infestation, where a few hundred of the right homes is the whole campaign.',
    ideas: [
      'Annual protection plan with the year laid out',
      'Mosquito season, mailed before the first warm evenings',
      'Termite inspection ahead of local swarm season',
      'Streets around a confirmed treatment nearby',
    ],
  },
  {
    slug: 'electrician',
    industry: 'Electrician',
    title: 'Direct Mail for Electricians',
    metaDescription:
      'Direct mail for electricians: panel upgrades, EV charger demand, and reaching homes whose wiring is showing its age. Free quote.',
    intro:
      'Most electrical work is invisible until it is urgent, which makes this trade look like plumbing. But it has something plumbing does not: a genuine new reason to call, because electric vehicles have created demand for a job most homeowners did not know existed five years ago and have no idea who to ring about.',
    audience:
      'Homeowners in older properties, where panels are undersized for how a modern house is actually used. Age of home is the filter that matters. For charger installation, newer and higher value homes skew better, and that is a different list and a different piece.',
    timing:
      'Less seasonal than most trades, which is an advantage: you can mail steadily through the year rather than fighting for attention in the same six weeks as everyone else. Safety messaging performs a little better in autumn as heating and lighting load rises.',
    message:
      'Name the specific job. Electrician on its own means nothing to somebody with no problem, but panel upgrade, EV charger, whole house surge protection and safety inspection are each concrete enough for a homeowner to recognise themselves in. A safety inspection at a fixed price is the way in, and for older housing stock it is a genuinely useful thing to buy.',
    volume:
      '2,000 to 4,000 per drop, run steadily rather than in bursts, since demand here is spread through the year rather than concentrated.',
    ideas: [
      'EV charger installation to newer and higher value homes',
      'Panel upgrades for houses running on original wiring',
      'Home electrical safety inspection at a fixed price',
      'Whole house surge protection after local storms',
    ],
  },
]

/** The guide for a slug, or undefined when no page should exist. */
export function guideBySlug(slug: string): IndustryGuide | undefined {
  return industryGuides.find((g) => g.slug === slug)
}

/** The guide for an industry name, used by the hub to decide whether to link. */
export function guideForIndustry(name: string): IndustryGuide | undefined {
  return industryGuides.find((g) => g.industry === name)
}
