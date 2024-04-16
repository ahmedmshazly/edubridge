import React from 'react';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url)
    };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <nav>
          <ul>
            <li><a onClick={() => navigateTo('/home')}>Home</a></li>
            <li><a onClick={() => navigateTo('/datasets')}>Datasets</a></li>
            <li><a onClick={() => navigateTo('/questions')}>Questions</a></li>
            <li><a onClick={() => navigateTo('/about')}>About</a></li>
            <li className="button" onClick={() => navigateTo('/get-started')}>Get Started</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Empowering Education with Data Science</h1>
        <p>Discover the power of data to transform educational outcomes and foster learning environments that inspire.</p>
        <div className="hero-buttons">
          <button onClick={() => navigateTo('/get-started')}>Get Started</button>
          <button onClick={() => navigateTo('/login')}>Login</button>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/800x400" alt="Educational Data Analysis" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature accessible">
          <h2>Innovative Learning Analytics</h2>
          <p>Unveiling insights that support academic success through state-of-the-art learning analytics.</p>
          <img src="https://via.placeholder.com/200" alt="Innovative Learning" />
        </div>
        <div className="feature integrated">
          <h2>Integrated Data Systems</h2>
          <p>Seamlessly integrate educational datasets for a holistic view of the learning landscape.</p>
          <img src="https://via.placeholder.com/200" alt="Data Integration" />
        </div>
        <div className="feature actionable">
          <h2>Actionable Intelligence</h2>
          <p>Transform data into actionable intelligence to drive educational strategies and policies.</p>
          <img src="https://via.placeholder.com/200" alt="Actionable Intelligence" />
        </div>
        <div className="feature targeted">
          <h2>Targeted Interventions</h2>
          <p>Utilize predictive analytics to implement targeted interventions that support learners at all levels.</p>
          <img src="https://via.placeholder.com/200" alt="Targeted Interventions" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>Our Methodology</h2>
        <div className="how-step">
          <h3>Step 1: Data Aggregation</h3>
          <p>Collecting comprehensive educational data to build a solid foundation for analysis.</p>
          <img src="https://via.placeholder.com/200" alt="Data Aggregation" />
        </div>
        <div className="how-step">
          <h3>Step 2: Insightful Analysis</h3>
          <p>Employing advanced analytical techniques to uncover deep insights into the educational process.</p>
          <img src="https://via.placeholder.com/200" alt="Data Analysis" />
        </div>
        <div className="how-step">
          <h3>Step 3: Empowering Educators</h3>
          <p>Providing educators with the tools and knowledge to apply data-driven decisions in the classroom.</p>
          <img src="https://via.placeholder.com/200" alt="Empowering Educators" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Start Your Data Journey in Education Today</h2>
        <p>Join the forefront of educational innovation and make a lasting impact.</p>
        <button onClick={() => navigateTo('/get-started')}>Get Started Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} EduData Analytics. Elevating education through data.</p>
      </footer>
    </div>
  );
};

export default HomePage;
