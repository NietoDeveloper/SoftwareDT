

const Payment = () => {
  return (
    <div>
        <div>
            <h1>Paga Con Tarjetas</h1>
            <form>
                <input type="email" required/>

                <div>
                  <label htmlFor="card-info">Infoarmacion De Tarjeta </label>
                  <input id="card-info" type="number" required />

                    <div className="flex">
                     <input id="date" type="date" />

                    </div>
                </div>

                <input type="text" id="name" />

            </form>

        </div>
    </div>
  )
}

export default Payment;