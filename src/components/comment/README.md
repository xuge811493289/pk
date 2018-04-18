version: 1.0

## 使用方法
放在占位div里

<sy-comment ...Attribute></sy-comment>

### Attribute
| subject-name | string | 项目名称
| subject-id | string | 项目ID
| app-code | string | appCode
| status | Number | 状态
| type-id | String | 类型(基础，拓展，研究)
@add-comment 带的参数为{ subjectId, userId }
@add-reply 带的参数为{ subjectId, userId }
@del-comment 带的参数为{ subjectId, userId }
@del-reply 带的参数为{ subjectId, userId }



