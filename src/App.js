import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './index.css';
import slootsgradient from './assets/slootsgradient.png';

export default function Home() {
  return (
      <div className="h-screen">
        <div style={{backgroundImage: `url(${slootsgradient})`}} className="flex flex-col h-full">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
  );
}
