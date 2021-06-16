window.addEventListener('DOMContentLoaded', function() {
	//body取得
	const body = document.getElementsByTagName('body')[0];
	const bodyId = body.id;

	//レスポンシブ用
	const windowW = window.innerWidth;
	(windowW <= 640) ? body.classList.add('sp') : body.classList.add('pc');
	
	//画像のリスト作成
	function createList(month, imgList, div) {
		div.innerHTML = "";
		const ul = document.createElement('ul');
		ul.classList.add('image-list');
		for (const elem of imgList) {
			const li = document.createElement('li');
			const span = document.createElement('span');
			span.style.backgroundImage = 'url(img/' + month + '/' + elem.imgName + ')';
			const p = document.createElement('p');
			p.innerText = elem.caption;
			if (month == 'animals') {
				span.classList.add('animals-image');
				p.classList.add('animals-image-p');
			} else {
				span.classList.add('days-image');
				p.classList.add('days-image-p');
			}
			li.appendChild(span);
			li.appendChild(p);
			
			//動物たちのショップアイコン表示
			if (elem.line != undefined) {
				const lineUrl = elem.line;
				const suzuriUrl = elem.suzuri;
				const divIcon = document.createElement('p');
				divIcon.classList.add('icon-btn-outer');
				if (lineUrl != '') {
					const lineBtn = document.createElement('a');
					lineBtn.href = 'https://line.me/S/sticker/' + lineUrl;
					lineBtn.target = '_blank';
					lineBtn.classList.add('icon-btn','btn-line');
					divIcon.appendChild(lineBtn);
				}
				if (suzuriUrl != '') {
					const suzuriBtn = document.createElement('a');
					suzuriBtn.href = 'https://suzuri.jp/ichomae/omoide/' + suzuriUrl;
					suzuriBtn.target = '_blank';
					suzuriBtn.classList.add('icon-btn','btn-suzuri');
					divIcon.appendChild(suzuriBtn);
				}
				li.appendChild(divIcon)
			}
			
			ul.appendChild(li);
		}
		div.appendChild(ul);
	};
	
	//トップページ
	if(bodyId == 'index') {
		const month = daysData[0].month;
		const imgList = daysData[0].imgList.slice(0, 3);
		const div = document.getElementById('days-latest');
		//画像リスト作成
		createList(month, imgList, div);
	}
	
	//日々のページ
	if(bodyId == 'days') {
		let month = daysData[0].month;
		let imgList = daysData[0].imgList;
		//月の文字列作成
		function createMonthStr(month) {
			const yyyy = month.substr(0, 4);
			const mm = month.substr(4, 1) != '0' ? month.substr(4, 2) : month.substr(5, 1);
			const str = yyyy + '年' + mm + '月';
			return str;
		};
		//プルダウン作成
		const monthSelect = document.getElementById('monthly-select');
		for(const elem of daysData){
			const opt = document.createElement('option');
			const monthStr = createMonthStr(elem.month);
			opt.value = elem.month;
			opt.text = monthStr;
			monthSelect.appendChild(opt);
		}
		//月の名前作成
		let monthStr = createMonthStr(month);
		//画像リスト作成
		const div = document.getElementById('days-monthly');
		document.getElementById('days-monthly-h2').innerText = monthStr;
		createList(month, imgList, div);
		//他の月を選択したとき
		monthSelect.addEventListener('change', function(){
			month = monthSelect.value;
			imgList = daysData.filter(function(data){
				return data.month === month
			})[0].imgList;
			monthStr = createMonthStr(month);
			document.getElementById('days-monthly-h2').innerText = monthStr;
			//画像リスト作成
			createList(month, imgList, div);
		});
	}
	
	//動物たちのページ
	if(bodyId == 'animals') {
		const divParent = document.getElementById('animals-container');
		const divBox = document.createElement('div');
		for (const elem of animalsData) {
			const section = document.createElement('section');
			section.classList.add('category');
			const h2 = document.createElement('h2');
			h2.innerText = elem.h2;
			const p = document.createElement('p');
			p.innerText = elem.p;
			const div = document.createElement('div');
			div.classList.add('image-list-outer');
			const imgList = elem.imgList;
			//画像リスト作成
			createList('animals', imgList, div);
			section.appendChild(h2);
			section.appendChild(p);
			section.appendChild(div);
			divBox.appendChild(section);
		}
		divParent.appendChild(divBox);
	}
	
	//トップに戻る
	function getScrolled() {
		return (window.pageYOffset !== undefined) ? window.pageYOffset: document.documentElement.scrollTop;
	};
	
	const topButton = document.getElementById('page-top');
	
	window.onscroll = function() {
		(getScrolled() > 500) ? topButton.classList.add('fade-in'): topButton.classList.remove('fade-in');
	};
	
	function scrollToTop() {
		var scrolled = getScrolled();
		window.scrollTo(0, Math.floor(scrolled / 2));
		if (scrolled > 0) {
			window.setTimeout(scrollToTop, 30);
		}
	};
	
	topButton.onclick = function() {
		scrollToTop();
	};
});