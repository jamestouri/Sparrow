import React from 'react';
import { Link } from 'react-router-dom';
import { getExternalInfo } from '../../util/asset_api_util';

class AssetAbout extends React.Component {
  constructor(props){
    super(props);
    this.state = { about: {}, stats: {}, quote: {}, hiding: true };
    this.toggleHide = this.toggleHide.bind(this);
    this.employees = this.props.asset.employees;
    this.headquarters = this.props.asset.headquarters;
    this.founded = this.props.asset.founded;
  }

  componentDidMount(){
    getExternalInfo("company", this.props.asset).then((data) => {
      this.setState({ about: data });
    });
    getExternalInfo("stats", this.props.asset).then((data) => {
      this.setState({ stats: data });
    });
  }

  toggleHide(e) {
    const hideThis = document.getElementById('sometimes-show');
    hideThis.classList.toggle('hidden');
    hideThis.classList.toggle('showing');
    if (this.state.hiding) {
      this.setState({ hiding: false });
    } else {
      this.setState({ hiding: true });
    }
  }

  formatNums(number) {
    const num = parseFloat(number);
    if(num > Math.pow(10, 9)){
      return (num / Math.pow(10, 9)).toFixed(2) + ' B';
    } else if (num > Math.pow(10, 6)) {
      return (num / Math.pow(10, 6)).toFixed(2) + ' M';
    } else if (num){
      return num.toFixed(2);
    } else if (isNaN(num)) {
      return 0;
    } else {
      return num;
    }
  }

  render () {
    let assetTags;
    if (this.state.about.tags){
      assetTags = this.state.about.tags.map((tag) => {
        return <Link to={`/collection/${tag}`} key={tag} >{tag}</Link>;
      });
    }
    const moreAbout = [{"High Today": `$ ${this.formatNums(this.props.asset.high)}`},
      {"Low Today": `$ ${this.formatNums(this.props.asset.low)}`},
      {"Open Price": `$ ${this.formatNums(this.props.asset.open)}`},
      {"Volume": this.formatNums(this.props.asset.iexVolume)},
      {"52 Week High": `$ ${this.formatNums(this.state.stats.week52high)}`},
      {"52 Week Low": `$ ${this.formatNums(this.state.stats.week52low)}`},];
    const sometimesShow = moreAbout.map((el, idx) => {
      return (<li key={idx}>
        <div className="bold">{Object.keys(el)}</div>
        <div>
          {Object.values(el)}
        </div>
      </li>);
    });
    return (
      <div className="asset-about">
        <div className="about-span">
          <div className="asset-header">
            <h2>About</h2>
            <button id="show-hide" onClick={this.toggleHide}>Show {this.state.hiding ? 'More' : 'Less'}</button>
          </div>
          <h3>{this.state.about.description}</h3>
          <ul className="asset-about-detail">
            <li>
              <div className="bold">CEO</div>
              <div>
                <a id="show-hide" href={`https://www.google.com/search?q=${this.state.about.CEO} ${this.state.about.companyName}`}>
                  {this.state.about.CEO}
                </a>
              </div>
              </li>
            <li>
              <div className="bold">Employees</div>
              <div>
                {this.employees}
              </div>
              </li>
            <li>
              <div className="bold">Headquarters</div>
              <div>
                {this.headquarters}
              </div>
              </li>
            <li>
              <div className="bold">Founded</div>
              <div>
                {this.founded}
              </div>
              </li>
            <li>
              <div className="bold">Market Cap</div>
              <div>
                {this.formatNums(this.props.asset.marketCap)}
              </div>
              </li>
            <li>
              <div className="bold">Price-Earnings Ratio</div>
              <div>
                {this.props.asset.peRatio}
              </div>
              </li>
            <li>
              <div className="bold">Dividend Yield</div>
              <div>
                {this.formatNums(this.state.stats.dividendYield)}
              </div>
              </li>
            <li>
              <div className="bold">Average Volume</div>
              <div>
                {this.formatNums(this.props.asset.avgTotalVolume)}
              </div>
              </li>
              <div id="sometimes-show" className="hidden">
                {sometimesShow}
              </div>
            </ul>
        </div>
        <div className="about-span">
          <div className="asset-header">
            <h2>Collection</h2>
          </div>
          <ul>{assetTags}</ul>
        </div>
      </div>
    );
  }
}

export default AssetAbout;
