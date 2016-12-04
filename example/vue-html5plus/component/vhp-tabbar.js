var aniShow = {};

Vue.component('vhp-tabbar', {
  	template: 	'<nav class="mui-bar mui-bar-tab">'+
  					'<a class="mui-tab-item" v-bind:class="{\'mui-active\': (index === Index)}" v-for="(item, index) in config" v-tap="{methods: switchView , index : index}">'+
  						'<span class="mui-icon" v-bind:class="item.icon"></span>'+
  						'<span class="mui-tab-label">{{item.name}}</span>'+
  					'</a>'+
  				'</nav>',
  	props: ['Index', 'styles', 'subpages', 'config'],
	mounted: function () {
		var _activeIndex = this.Index;
		var _subpages = this.subpages;
		var _styles = this.styles;
		
		this.activeTab = this.subpages[this.Index];
			
		vhp.plusReady(function(){
			var self = plus.webview.currentWebview();
			for (var i = 0; i < 3; i++) {
				var temp = {};
				var subpage = _subpages[i];
				var sub = plus.webview.create(subpage, subpage, _styles);
				if (i !== _activeIndex) {
					sub.hide();
				}else{
					temp[_subpages[i]] = "true";
					vhp.extend(aniShow,temp);
				}
				
				self.append(sub);
			}
		})
	},
	methods: {
		switchView: function (arg) {
			var index = arg.index;
			// 触发事件
			app.vm.activeIndex = index;
			
			var self = this;
			var targetTab = self.subpages[index];	
			if (targetTab == self.activeTab) {
		        return;
		    }
			vhp.plusReady(function(){
				if(vhp.os.ios||aniShow[targetTab]){
					plus.webview.show(targetTab);
				}else{
					var temp = {};
					temp[targetTab] = "true";
					vhp.extend(aniShow,temp);
					plus.webview.show(targetTab,"fade-in",300);
				}
				// 隐藏当前;
				plus.webview.hide(self.activeTab);
				// 更改当前活跃的选项卡
				self.activeTab = targetTab;
			})
		}
	}
});