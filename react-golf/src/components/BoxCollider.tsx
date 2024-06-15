import '../styles/box-collider.scss'

function BoxCollider() {
  return (
    <>
        <span className="box-collider-point box-collider-point-tl" />
        <span className="box-collider-point box-collider-point-tr" />
        <span className="box-collider-point box-collider-point-bl" />
        <span className="box-collider-point box-collider-point-br" />
    </>
  )
}

export default BoxCollider