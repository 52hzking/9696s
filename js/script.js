const canvas_model = document.getElementById("ModelCanvas");
const ctx_model = canvas_model.getContext("2d");

var SelectedOptions = {
    "Base": 0,
    "Eyes": 0,
    "Mouth": 0
}

CreateSelection_Main()
init_Img()

function init_Img(){
    ctx_model.clearRect(0, 0, canvas_model.width, canvas_model.height);

    setTimeout(function(){
        var knight_base = CreateImg(ctx_model,'Base',SelectedOptions["Base"])
    },100);
    setTimeout(function(){
        var knight_Eyes = CreateImg(ctx_model,"Eyes",SelectedOptions["Eyes"])
    },200);
    setTimeout(function(){
        var knight_Mouth = CreateImg(ctx_model,"Mouth",SelectedOptions["Mouth"])
    },300);
    
}

function CreateImg(_ctx_model,_category,_index){

    var Select_CategoryOption = SelectionOptions.find(FindCategory => FindCategory.Category == _category)

    if (Select_CategoryOption!= undefined){

        var FilePath = Select_CategoryOption.Options[_index].ImagePath

        const img = new Image();
        img.onload = () => {
            _ctx_model.drawImage(img, 0, 0,200,200);
    
        };
        img.src = FilePath;
    
        return img
    }

    
}

function CreateSelection_Main(){
    SelectionOptions.forEach(function(eachCatergory){
        CreateSelection_Each(eachCatergory)
    })
    SwitchCategory($("#Eyes_Selection_Btn")[0])
}

function CreateSelection_Each(_options){

    var HTML_Switch = `<button id="`+_options.Category+`_Selection_Btn" data-category="`+_options.Category+`"
     onclick="SwitchCategory(this)">`
    +_options.Category+`</button>`;

    var HTML_Selection = `<div id="`+_options.Category+`_Selection"></div>`;

    $("#Selection_Switch").append(HTML_Switch)
    $("#Selection_Container").append(HTML_Selection)

    var HTML_OptionBtn = "";
    _options.Options.forEach(function(eachOption, option_index){
        HTML_OptionBtn += `<button class="SelectionBtn" 
        style="background-image: url('`+eachOption.ImagePath+`');"  
        data-category="`+_options.Category+`" 
        data-index="`+option_index+`" 
        onclick="UpdateImg(this)"
        ></button>`
    })
    $("#"+_options.Category + "_Selection").append(HTML_OptionBtn)
   
}

function UpdateImg(_elem){
    var _caterory = $(_elem).data('category')
    var _NewVal = $(_elem).data('index')

    SelectedOptions[_caterory] = _NewVal
    
    init_Img()
}

function SwitchCategory(_elem){
    $("#Selection_Container>div").hide()
    $("#"+$(_elem).data("category")+"_Selection").show()
}