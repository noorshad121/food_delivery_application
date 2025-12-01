import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Home Section */}
      <section id="home">
        <Header />
      </section>

      {/* Menu Section */}
      <section id="menu">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </section>

      {/* Mobile App Section */}
      <section id="mobile">
        <AppDownload />
      </section>
    </div>
  );
};

export default Home;
