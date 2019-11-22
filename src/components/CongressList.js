import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class CongressList extends Component {
    state = {
        searchInput: '',
        advancedSearchInput: '',
        searchKey: 'first_name',
        members: [],
        advanced_search: false,
        advanced_title: 'Advanced',
        loading: true,
        currentPage: 1,
        membersPerPage: 7

    }
    componentDidMount () {
        this.fetchCongress('116', 'senate')
        
    }
    handleInput = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handlePageClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    fetchCongress = (congress, chamber) => {

        axios.get("https://api.propublica.org/congress/v1/"+congress+"/"+chamber+"/members.json", { 'headers': { 'X-API-Key': '5og6CCG0fxLBhSoanWGSMFsr7FDIs609Mvrg8r6n' } })
        .then((response => {
            const members = response.data.results[0].members
            this.setState({members: members, loading: false})
            console.log(members)
        }))

    }
    handleSelectChange = (e) => {
        this.setState({searchKey: e.target.value});
        console.log(e.target.value)

    }
    handleAdvanceSearch = () => {
    
        this.setState(prevState => ({advanced_search: !prevState.advanced_search}))
    }

    render() {
        const { members, searchInput, advanced_search, advancedSearchInput, searchKey, loading, currentPage, membersPerPage } = this.state
       
        const searchedMembers = members.filter(member => member.first_name.toLowerCase().includes(searchInput.toLowerCase())
         || member.last_name.toLowerCase().includes(searchInput.toLowerCase())
         || member.party.toLowerCase().includes(searchInput.toLowerCase())
         || member.state.toLowerCase().includes(searchInput.toLowerCase())
         || (member.party+'-'+member.state).toLowerCase().includes(searchInput.toLowerCase())
         || member.gender.toLowerCase().includes(searchInput.toLowerCase())
         || member.phone.toLowerCase().includes(searchInput.toLowerCase())
         || member.office.toLowerCase().includes(searchInput.toLowerCase())
         )
         const advancedSearchedMembers = members.filter(member => member[searchKey] ? member[searchKey].toString().toLowerCase().includes(advancedSearchInput.toLowerCase()) : null)
         let newMembers = []
         advanced_search ? newMembers = advancedSearchedMembers : newMembers = searchedMembers
         const indexOfLastMember = currentPage * membersPerPage;
         const indexOfFirstMember = indexOfLastMember - membersPerPage;
         const currentMembers = newMembers.slice(indexOfFirstMember, indexOfLastMember);
 
         const pageNumbers = [];
         for (let i = 1; i <= Math.ceil(newMembers.length / membersPerPage); i++) {
           pageNumbers.push(i);
         }
     
         const renderPageNumbers = pageNumbers.map(number => {
           return (
               <button key={number} id={number} onClick={this.handlePageClick}>{number}</button>
             
           );
         });
 
         let keys = []
         if (members.length>0) {
             keys = Object.keys(members[0])
         }
        return (
            <div className='container'>
                <button onClick={this.handleAdvanceSearch}>{!advanced_search ? 'Advanced' : 'Basic'} Search</button>
                <div hidden={!advanced_search}>
                    <br />
                    <select id="memberKeys" onChange={this.handleSelectChange} value={searchKey}>
                        {keys.map((k, idx) => <option key={idx} value={k}>{k}</option>)}
                    </select>
                    &nbsp;
                    <input type='text' placeholder='Search...' onChange={this.handleInput} name='advancedSearchInput' value={advancedSearchInput} />
                </div>
                <div hidden={advanced_search}>
                <br />
                <input type='text' className='u-full-width' placeholder='Search...' onChange={this.handleInput} name='searchInput' value={searchInput} />
                </div>
                <table className='u-full-width'>
                    <thead>
                        <tr>
                            <th>Congressman</th>
                            <th>Gender</th>
                            <th>Party-State</th>
                            <th>Phone</th>
                            <th>Office Address</th>
                        </tr>
                    </thead>
                <tbody>
                {!loading ? currentMembers.map((member, idx) => {
                return <tr key={idx}>
                            <td><Link to={'members/'+member.id}>{member.short_title+' '+member.first_name+' '+member.last_name}</Link></td>
                            <td>{member.gender}</td>
                            <td>{member.party+'-'+member.state}</td>
                            <td>{member.phone}</td>
                            <td>{member.office}</td>
                        </tr>
                }) : <tr><td>Loading...</td></tr>}
                    
                </tbody>
                
                </table>
                {renderPageNumbers}
                
            </div>
        )
    }
}

export default CongressList;
