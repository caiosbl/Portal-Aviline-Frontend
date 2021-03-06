import React, { Component } from 'react';
import ColumnCard from './ColumnCard';
import NotFound from './NotFound';
import { Container, Row, Col,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FacebookProvider, Comments } from 'react-facebook';
import ShareBar from './ShareBar';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class Column extends Component {

    constructor(props) {
        super(props);

        this.state = {

            load: true,
            slug: props.match.params.id,
            post: "",
            notFound: false
        };
    }

    componentDidMount() {
        document.title = "Portal Aviline";
    }

    getBreadcrumb(that) {

        const author = that.state.post.author.slug;
        return (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem >Colunas</BreadcrumbItem>
                <BreadcrumbItem ><Link to={`/columns/${author}`}>Coluna do {that.state.post.author.name}</Link></BreadcrumbItem>
                <BreadcrumbItem active >{that.state.post.title} </BreadcrumbItem>
            </Breadcrumb>
        );
    }

    async getData(slug, that) {

        fetch(`https://aviline.herokuapp.com/api/column/${slug}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                if(res.length === 0) that.setState({ notFound: true, load: false }) 
                else{
                    that.setState({ post: res[0], load: false });

                const title = res[0].title !== undefined ? res[0].title : "";
                const author = res[0].name !== undefined ? res[0].name : "";
                if (title !== undefined) document.title = `Portal Aviline - ${title} - Coluna do ${author}`;
            }});

    }

    initializeGA(){
        ReactGA.initialize('UA-131777803-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        this.initializeGA();
        this.state.load && this.getData(this.state.slug, this);
        const post = this.state.post;


        return (

            <Container style={{ marginBottom: 100 }}>
                <Row>
                {this.state.notFound ? <NotFound /> :

                    <Col xs={12} md={10}>
                    
                    {!this.state.load && this.getBreadcrumb(this)}
                        <ColumnCard data={post} />


                        {(this.state.post !== undefined  && this.state.post !== "") && <ShareBar url={window.location.href} title={`${post.title} - Portal Aviline`} 
                        description={post.content.description}
                        />}

                        <h3 style={{ fontFamily: 'Roboto Condensed, sans-serif', color: "#dc3545", borderBottom: '3px solid #dc3545' }}>Comentários</h3>

                        <FacebookProvider appId="276953129067999" language="pt_BR">
                            <Comments href={window.location.href} numPosts={5} width={'auto'} />
                        </FacebookProvider>
                    </Col>

                }



                </Row>
            </Container>
        );
    }
}

export default Column;
