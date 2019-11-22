import React, { Component} from 'react';
class Layout extends Component {
    
    render() {
        return (
            <div>
                <header>

                ProPublica Congress
                </header>
                <section>
                    <content>
                    {this.props.children}
                    </content>
                </section>
                <footer>

                ProPublica Congress 2019
                </footer>
            </div>
        )
    }
    
}
export default Layout
