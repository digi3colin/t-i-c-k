function FASTEventDispatcher()
{
	var queue = {};

	this.dispatchEvent = function(eventObj){
		var q = queue[eventObj['type']];
		if(q == undefined)return;
		for (var i=0;i<q.length;i++){
			q[i](eventObj);
		}
	}

	this.addEventListener = function(eventName, handler){
		queue[eventName] = queue[eventName]||[];
		this.removeEventListener(eventName, handler);
		queue[eventName]['push'](handler);
	}

	this.removeEventListener = function(eventName, handler){
		var q = queue[eventName];
		if(q == undefined)return;
		for (var i=0; i < q.length; i++){
			if(queue[i]===handler){
				queue.splice(i, 1);
				return;
			};
		}
	}
}

FASTEventDispatcher.initialize = function(object)
{
	if(object['EDL']!=undefined)return;
	var e = new FASTEventDispatcher();
	object['EDL'] = e;
	object['addEventListener']    = e.addEventListener;
	object['removeEventListener'] = e.removeEventListener;
	object['dispatchEvent']       = e.dispatchEvent;
	object['dispatchQueue']       = e.dispatchQueue;
}

function FASTEvent(currentTarget,type,target)
{
	this.target = target||currentTarget;
	this.currentTarget = currentTarget;
	this.type = type;
}