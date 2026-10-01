import { useState } from 'react'
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  PackageCheck,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import './App.css'

const vehicles = [
  { name: 'Tata Ace', detail: 'Up to 750 kg', size: 'Small loads', price: '₹150' },
  { name: 'Pickup 8 ft', detail: 'Up to 1,250 kg', size: 'Room to spare', price: '₹220' },
  { name: 'Canter 14 ft', detail: 'Up to 3,500 kg', size: 'Big moves', price: '₹480' },
]

function App() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].name)
  const [estimate, setEstimate] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function swapLocations() {
    setPickup(dropoff)
    setDropoff(pickup)
  }

  function getEstimate(event) {
    event.preventDefault()
    if (!pickup.trim() || !dropoff.trim()) {
      setEstimate('Add both locations to see your trip estimate.')
      return
    }

    const vehicle = vehicles.find((item) => item.name === selectedVehicle)
    setEstimate(`Estimated from ${vehicle.price} with ${vehicle.name} for ${pickup.trim()} to ${dropoff.trim()}. Final fare depends on distance.`)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="True Load home">
          <span className="brand-mark"><Truck size={21} strokeWidth={2.5} /></span>
          <span>True Load<span className="brand-period">.</span></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#why-true-load" onClick={() => setMenuOpen(false)}>Why True Load</a>
        </nav>
        <a className="header-action" href="#book">Book a truck <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> GOODS ON THE GO</span>
            <h1>Big move?<br />We’re <span>on it.</span></h1>
            <p className="hero-description">The right truck, right when you need it. Book reliable city transport in just a few taps.</p>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true"><span>R</span><span>S</span><span>A</span></div>
              <p><strong>Loved by 1M+ customers</strong><br />Moving cities, one delivery at a time</p>
            </div>
          </div>

          <div className="booking-panel" id="book">
            <div className="booking-heading">
              <div>
                <span className="booking-kicker">ON-DEMAND TRUCKS</span>
                <h2>Where are we headed?</h2>
              </div>
              <span className="booking-icon"><Truck size={22} /></span>
            </div>
            <form onSubmit={getEstimate}>
              <div className="route-fields">
                <label className="location-field">
                  <span className="location-dot pickup-dot" />
                  <span className="field-content"><span className="field-label">PICKUP FROM</span><input value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Enter pickup location" aria-label="Pickup location" /></span>
                  <MapPin className="field-pin" size={17} />
                </label>
                <button className="swap-button" type="button" onClick={swapLocations} aria-label="Swap pickup and drop-off"><ArrowDownUp size={17} /></button>
                <label className="location-field">
                  <span className="location-dot dropoff-dot" />
                  <span className="field-content"><span className="field-label">DROP OFF AT</span><input value={dropoff} onChange={(event) => setDropoff(event.target.value)} placeholder="Enter drop-off location" aria-label="Drop-off location" /></span>
                  <MapPin className="field-pin" size={17} />
                </label>
              </div>
              <div className="vehicle-heading"><span>CHOOSE YOUR TRUCK</span><a href="#services">Compare sizes <ArrowRight size={13} /></a></div>
              <div className="vehicle-options" role="group" aria-label="Choose a truck">
                {vehicles.map((vehicle) => (
                  <button className={selectedVehicle === vehicle.name ? 'vehicle-option selected' : 'vehicle-option'} type="button" key={vehicle.name} onClick={() => setSelectedVehicle(vehicle.name)} aria-pressed={selectedVehicle === vehicle.name}>
                    <Truck size={21} strokeWidth={1.8} />
                    <span className="vehicle-name">{vehicle.name}</span>
                    <span className="vehicle-detail">{vehicle.detail}</span>
                    <span className="vehicle-price">from {vehicle.price}</span>
                    {selectedVehicle === vehicle.name && <span className="vehicle-check"><Check size={11} /></span>}
                  </button>
                ))}
              </div>
              <button className="estimate-button" type="submit">Get fare estimate <ArrowRight size={18} /></button>
              {estimate && <p className="estimate-message" role="status">{estimate}</p>}
              <p className="booking-footnote"><ShieldCheck size={14} /> No surprises. See your fare before you book.</p>
            </form>
          </div>
        </div>
        <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="service-strip" id="services" aria-label="true-load services">
        <a href="#book" className="service-link"><span className="service-icon service-yellow"><Truck size={21} /></span><span><strong>Mini trucks</strong><small>For every kind of cargo</small></span><ArrowUpRight size={17} /></a>
        <a href="#book" className="service-link"><span className="service-icon service-blue"><PackageCheck size={21} /></span><span><strong>Two-wheelers</strong><small>Small package, fast delivery</small></span><ArrowUpRight size={17} /></a>
        <a href="#book" className="service-link"><span className="service-icon service-coral"><Clock3 size={21} /></span><span><strong>Packers & movers</strong><small>Make moving feel lighter</small></span><ArrowUpRight size={17} /></a>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-label">THAT’S THE WHOLE ROUTE</span>
          <h2>Three steps.<br /><span>One less thing to worry about.</span></h2>
        </div>
        <div className="steps-grid">
          <article className="step-item"><span className="step-number">01</span><span className="step-line" /><h3>Tell us where</h3><p>Set your pickup and drop-off points. Add a stop if the day needs one.</p></article>
          <article className="step-item"><span className="step-number">02</span><span className="step-line" /><h3>Pick your ride</h3><p>Choose a truck that fits your goods and your budget.</p></article>
          <article className="step-item"><span className="step-number">03</span><span className="step-line" /><h3>We’ll take it from here</h3><p>Your driver arrives ready. Track your trip all the way there.</p></article>
        </div>
      </section>

      <section className="trust-section" id="why-true-load">
        <div className="trust-copy"><span className="section-label">GOOD PEOPLE. GOOD JOURNEYS.</span><h2>Moving the city,<br /><span>together.</span></h2><p>From one box to a whole business, we make getting it there feel easy. Trusted by people and businesses in 22+ cities.</p><a className="trust-link" href="#book">Find your ride <ArrowRight size={16} /></a></div>
        <div className="trust-stats"><div><strong>1 Cr<span>+</span></strong><small>happy customers</small></div><div><strong>15 L<span>+</span></strong><small>driver partners</small></div><div><strong>10 Cr<span>+</span></strong><small>trips completed</small></div><div className="trust-seal"><ShieldCheck size={27} /><span>Made for<br />the long haul</span></div></div>
        <div className="trust-photo"><img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=85" alt="Delivery truck ready for a city journey" /><span>YOUR CITY, IN GOOD HANDS</span></div>
      </section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Truck size={20} strokeWidth={2.5} /></span><span>True Load<span className="brand-period">.</span></span></a><span>Delivery aapki. Transport hamara.</span><a href="#top">Back to top <ChevronDown size={14} className="back-to-top-icon" /></a></footer>
    </main>
  )
}

export default App
