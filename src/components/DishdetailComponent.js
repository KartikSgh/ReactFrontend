import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, ul,li,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {    

    constructor(props) {
        super(props);
        this.state = {  
                  
        };
      }

    renderDish(dish) {
        if (dish != null)
            return(
                <Card key={dish.id}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(dish) {
        if (dish != null) {            
            const comm=dish.comments.map((singlecomment) => {
                return(
                <div key={singlecomment.id}>
                    <ul className="list-unstyled">
                        <li>{singlecomment.comment}<br/>
                        --{singlecomment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(singlecomment.date)))}</li>
                    </ul>
                </div>
                );
            });
            return(
                <div>
                    <header>
                        <h4>Comments</h4>
                    </header>
                    <div>
                    {comm}
                    </div>
                </div>
                );
            
        }else
            return(
            <div></div>
            );
    }

    render() {
        
        return (       
            <div className="container">            
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">                    
                        {this.renderComments(this.props.dish)}
                    </div>
                </div> 
            </div>       
          
        );
    }
}

export default DishDetail;