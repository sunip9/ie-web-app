import React from 'react'

export default function Profile() {
    return (
        <>
            <form class="ui form massive container m-4">
                <h4 className="ui dividing header" style={{fontSize: '30px'}}>Worker Information</h4>
                <div class="fields">
                    <div class="field">
                        <label>Name</label>
                        <input type="text" placeholder="Name"/>
                    </div>
                    <div class="field">
                        <label>Designation</label>
                        <input type="text" placeholder="Designation"/>
                    </div>
                    <div class="field">
                        <label>Employee ID</label>
                        <input type="text" placeholder="ID"/>
                    </div>
                    <div class="field">
                        <label>Status</label>
                        <input type="text" placeholder="Active"/>
                    </div>
                </div>
                <div class="fields">
                    <div class="field">
                        <label>Salary</label>
                        <input type="text" placeholder="salary"/>
                    </div>
                    <div class="field">
                        <label>Floor</label>
                        <input type="text" placeholder="floor"/>
                    </div>
                    <div class="field">
                        <label>Section</label>
                        <input type="text" placeholder="section"/>
                    </div>
                    <div class="field">
                        <label>Shift</label>
                        <input type="text" placeholder="shift"/>
                    </div>
                </div>

                <div class="ui message">
                    <div class="header">Skills</div>
                        <ul class="list">
                            <li>Cutting</li>
                            <li>Stitching</li>
                        </ul>
                </div>

              


                <table class="ui celled padded table">
                <thead>
                    <tr><th class="single line">Date </th>
                    <th>PO</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Total Time</th>
                    <th>Comments</th>
                </tr></thead>
                <tbody>
                    <tr>
                    <td>
                        <h2 class="ui center aligned header">July 10th 2021</h2>
                    </td>
                    <td class="single line">
                        <a href="#">1234</a>
                    </td>
                    <td>
                        <div className="ui star rating" data-rating="3" data-max-rating="3">30x30</div>
                    </td>
                    <td class="right aligned">
                        80 <br/>
                        <a >18</a>
                    </td>
                    <td>2000 min</td>
                    <td>
                        <div class="ui star rating" data-rating="3" data-max-rating="3">100%</div>
                    </td>
                    </tr>
                   
                </tbody>
                <tfoot>
                    <tr><th colspan="5">
                    <div class="ui right floated pagination menu">
                        <a class="icon item">
                        <i class="left chevron icon"></i>
                        </a>
                        <a class="item">1</a>
                        <a class="icon item">
                        <i class="right chevron icon"></i>
                        </a>
                    </div>
                    </th>
                </tr></tfoot>
                </table>

                <div class="ui submit button">Print</div>
            </form>
        </>
    )
}
