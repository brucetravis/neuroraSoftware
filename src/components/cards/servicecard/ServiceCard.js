import React from 'react';
import { animated, useSpring } from '@react-spring/web';

export default function ServiceCard({ icon, title, description, delay = 0 }) {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay,
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={cardSpring} className="service-card">
      <div className="icon-wrapper">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </animated.div>
  );
}
