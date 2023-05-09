import './MoreButton.css';

const MoreButton = (props) => {
  return (
    <section className="more">
      <button type="button" className="more__button" onClick={props.onClick}>Еще</button>
    </section>
  )
}

export default MoreButton;