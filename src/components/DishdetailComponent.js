import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';  
import { Control, LocalForm, Errors } from 'react-redux-form'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);    

class CommentForm extends Component {

constructor(props) {
    super(props);   
    
    this.state = {          
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this); 
    this.handleComment = this.handleComment.bind(this);       
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleComment(values) {
      this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

render() { 
    
  return (
      <div className="container">
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleComment(values)}>
                        <Row className="form-group">         
                                    <Label htmlFor="rating" md={12}>Rating</Label>                       
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                        </Row>  
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                            </Col>
                        </Row>                          
                        
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>                  
                </ModalBody>
            </Modal>            
        <div className="col-12">     
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        </div>
    </div>
  );
}
}
    
    function RenderDish({dish}) {
        if (dish != null)
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card key={dish.id}>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {            
            const comm=comments.map((singlecomment) => {
                return(
                    <Stagger in>                    
                        <div key={singlecomment.id}>
                            <ul className="list-unstyled">                           
                            <Fade in>
                                <li>{singlecomment.comment}</li>
                                <li>--{singlecomment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(singlecomment.date)))}</li>
                            </Fade>                     
                            </ul>
                        </div>                    
                    </Stagger>
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
                    <div>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </div>
                </div>
                );
            
        }else
            return(
            <div></div>
            );
    }

    const DishDetail = (props) => {

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)         
            return (       
                <div className="container"> 
                    <div className="row">
                        <Breadcrumb>                        
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>           
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">                    
                            <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                        </div>
                    </div> 
                </div>       
            
            );
    }


export default DishDetail;