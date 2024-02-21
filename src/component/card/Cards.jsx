import './cardStyles.css';

const Card = ({ title, content }) => {
  return (
    <div className="card-container">
      <div className="box">
        <div className="font-semibold md:font-bold text-4xl">{title}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};

export default Card;
