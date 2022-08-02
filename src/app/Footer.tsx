import React from 'react';

const Footer: React.FC = () => {

  return (
    <footer>
      <div className="footerInfo container">
        <p className="footerInfo__text">© 1992 - 2020 Честный Агент © Все права защищены.</p>
        <p className="footerInfo__tel"><a href="tel:8 (495) 150-21-12" className="footerText__link">8 (495) 150-21-12</a></p>
      </div>
    </footer>
  );
}

export default Footer
