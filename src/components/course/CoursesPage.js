import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            course: { title: '' }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    onTitleChange(event){
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }
    onClickSave(event){
        event.preventDefault();
        let inputVal = this.state.course.title;
        this.props.actions.createCourse(this.state.course);
        inputVal = '';
    }
    courseRow(course, index){
        return <div key={index}>{course.title}</div>;
    }
    render(){
        return(
            <div>
                {this.props.courses.map(this.courseRow)}
                <h1>Courses</h1>
                <h2>Add Course</h2>
                <input 
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title}/>
                <input 
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave}/>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // createCourse: (course) => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);