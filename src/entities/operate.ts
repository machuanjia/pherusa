/** @format */

export type OperateState = {
    isEdit: boolean
    step: number
    draft: {} | null
    isNext: boolean
}

export type OperateAction = {
    type: string
    payload?: any
}

export type DispatchType = (args: OperateAction) => OperateAction

export interface IOperateSignRenewalStepProps {
    step?: number
    isNext?: boolean
    isEdit?: boolean
    updateDraft?: any
    setStep?: (step: number) => {}
}
export interface IOperateSignRenewalEntity {
    licence_uri?: string

    team_name?: string

    law_represent?: string

    address?: string

    location_code?: string

    company_create_time?: string

    bss_scope?: string

    bss_project?: string

    recommend_customer?: string

    project_avg_quota?: number

    admin_name?: string

    admin_phone?: string

    admin_mail?: string

    admin_wechat?: string

    market_name?: string

    market_phone?: string

    market_mail?: string

    bss_name?: string

    bss_phone?: string

    bss_mail?: string

    engineer_name?: string

    engineer_phone?: string

    engineer_mail?: string

    sale_name?: string

    sale_phone?: string

    sale_mail?: string

    partner_type?: string[]

    good_industries?: string[]

    good_area?: string

    software_team_count?: number

    sale_team_count?: number

    touch_rpa?: number

    touch_rpa_content?: string

    source?: string
}
