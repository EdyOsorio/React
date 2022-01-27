import React , {Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            nombre:'',
            usd:0,
            monedas:[]
        };
        this.ingresaDatos = this.ingresaDatos.bind(this);
        this.nuevaCrypto = this.nuevaCrypto.bind(this);
    }
    ingresaDatos(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    nuevaCrypto(e){
        fetch('/crypto', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({nombre:'', usd:0})
            this.obtenerCrypto()
        })
        .catch(err => console.error(err));
        e.preventDefault();
    }
    componentDidMount() {
        this.obtenerCrypto()
    }
    obtenerCrypto() {
        fetch('/crypto')
        .then(res => res.json())
        .then(data => {
            this.setState({monedas:data});
            console.log(this.state.monedas);
        })

    }
    render(){
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Criptomonedas</a>
                    </div>
                </nav>
                <div className="container formulario">
                    <div className="row">
                    <div className="col-md-4">
                    </div> 
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.nuevaCrypto}>
                                        <div className="row">
                                            <div className="form-floating mb-3">
                                               <input name="nombre" onChange={this.ingresaDatos} type="text" className="form-control" placeholder="BTC" value={this.state.nombre}/>
                                                <label >Nombre de la Criptomoneda</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-floating mb-3 input-group">
                                               <input name="usd" onChange={this.ingresaDatos} type="number" className="form-control"  placeholder="0" value={this.state.usd}/>
                                                <label >Valor en USD</label>
                                                <span className="input-group-text">USD</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-outline-dark" type="submit">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <br/>
                        <div className="row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Valor en USD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.monedas.map(moneda=> {
                                            return (
                                                <tr key={moneda.usd}>
                                                    <td>{moneda.nombre}</td>
                                                    <td>{moneda.usd}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        )
    }
}
export default App;