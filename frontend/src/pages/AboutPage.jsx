import { PageTitle } from "../components"

const AboutPage = () => {
  return (
    <div className="container">
      <PageTitle
        title="About"
        product
      />
      <h2 className="mb-1-5">About</h2>
      <p
        className="article-text"
        style={{
          width: "70%",
        }}
      >
        This project has been developed for demonstration purposes only. Please
        note that all information and data is fictional and not intended to
        represent any actual company, product, or data.
      </p>
    </div>
  )
}

export default AboutPage
