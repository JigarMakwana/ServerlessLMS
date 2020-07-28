import React, { Component } from 'react'
import $ from 'jquery'

export class MLUpload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            counter: 10
        }

    }


    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }


    componentDidUpdate() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }

    submitHandler = () => {
        document.getElementById('loader').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('successText').style.display = 'block';
        }, 8000)
    }

    render() {
        return (
            <div className="container p-5">
                <form style={{ marginTop: "200px" }}>
                    <div className="custom-file" style={{ width: "60%" }}>
                        <input type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" htmlFor="customFile">Choose File</label>
                    </div>
                </form>
                <div className="container mt-5">
                    <button className="btn btn-outline-success" style={{ width: "20%" }} onClick={this.submitHandler}>Submit</button>
                </div>
                <div className="container mt-5" style={{ display: "none" }} id="loader">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="container mt-5" style={{ display: "none" }} id="successText">
                    <p className="lead">Analysis Completed!</p>
                </div>

            </div>
        )
    }
}

export default MLUpload

/**
 * {
    "message":[
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        },
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        },
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        }
    ]
}

 */