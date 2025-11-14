import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <img 
          src="https://media.hereco.xyz/assets/550869990_17885489733365604_3186628821431398796_n.jpg" 
          alt="Loading" 
          className="spinner-image"
        />
      </div>
      <p>Loading...</p>
    </div>
  )
}

export default LoadingSpinner
